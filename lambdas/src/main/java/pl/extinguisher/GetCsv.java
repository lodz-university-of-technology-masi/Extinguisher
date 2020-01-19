package pl.extinguisher;

import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.ItemCollection;
import com.amazonaws.services.dynamodbv2.document.QueryOutcome;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
import com.amazonaws.services.dynamodbv2.document.utils.ValueMap;
import com.amazonaws.services.lambda.AWSLambdaClient;
import com.amazonaws.regions.Regions;
import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.services.lambda.model.InvokeRequest;
import com.amazonaws.services.lambda.model.InvokeResult;
import com.amazonaws.services.s3.AmazonS3Client;

import com.google.gson.Gson;
import com.opencsv.CSVWriter;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.io.File;
import java.io.FileWriter;
import java.nio.ByteBuffer;

import java.sql.Timestamp;
import java.time.Instant;
import java.net.URL;

import java.io.StringWriter;
import java.io.PrintWriter;

public class GetCsv implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> request, Context context) {

        AWSLambdaClient lambdaClient;
        AmazonS3Client s3client = new AmazonS3Client(new EnvironmentVariableCredentialsProvider());
        Map<String, String> reqBody;
       // JsonObject jsonObject = gson.toJsonTree(request.get("body").toString()).getAsJsonObject();
        try {
            reqBody = (Map<String, String>) request.get("queryStringParameters");
        } catch(Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();

            ApiGatewayResponse res = new ApiGatewayResponse(400, sStackTrace);
            return res;
        }
        String testName = reqBody.get("testName");

       // context.getLogger().log("testName = " + testName);


        final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
        client.withRegion(Regions.US_EAST_1);
        DynamoDB dynamoDB = new DynamoDB(client);
        Table table = dynamoDB.getTable("Tests");
        String output = "";
        try{
            QuerySpec spec = new QuerySpec()
                    .withKeyConditionExpression("testName= :givenTest")
                    .withValueMap(new ValueMap()
                     .withString(":givenTest", testName));


            ItemCollection<QueryOutcome> items = table.query(spec);

            Iterator<Item> iterator = items.iterator();
            Item item = null;
            while (iterator.hasNext()) {
                item = iterator.next();
                output = item.toJSON();
            }
        }
        catch(Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();
            ApiGatewayResponse res = new ApiGatewayResponse(400, "Unable to scan users" + e.getMessage());
            return res;
        }

        context.getLogger().log("output = " + output);

        Gson gson = new Gson();
        Test test;
        test = gson.fromJson(output, Test.class);

        // String element = (String) map.get("recruiterID");
         // List<Map<String, String>> questionsList = new ArrayList<Map<String, String>>();
        List<Question> questionsList = test.getQuestionsList(); 
        int it = 1;
        // String line = "";
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        Instant instant = timestamp.toInstant();
        String fileName = "csv-" + test.getTestName() + "-" + instant.toString() + ".csv";
        File file = new File("/tmp/" + fileName);
        try {
            FileWriter outputfile = new FileWriter(file);

            // create CSVWriter with '|' as separator
            CSVWriter writer = new CSVWriter(outputfile, ';', CSVWriter.NO_QUOTE_CHARACTER,
                    CSVWriter.DEFAULT_ESCAPE_CHARACTER, CSVWriter.DEFAULT_LINE_END);
            List<String[]> data = new ArrayList<String[]>();
            for (Question question : questionsList) {
                String avAnswers = "";
                for(String answer : question.getAvailableAnswers()) {
                    avAnswers += answer + ';';
                }
                if(avAnswers.equals("")) {
                    avAnswers = "|;";
                }
                data.add(new String[] { Integer.toString(it), question.getType(), question.getLanguage(),
                        question.getQuestionContent(), Integer.toString(question.getAvailableAnswers().size()), avAnswers });
                it += 1;
            }
            writer.writeAll(data);
            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        s3client.putObject("pl-extinguisher-csvs-bucket", fileName, file);
        Date actualDate = new Date();
        final long HOUR = 3600*1000;
        Date expDate = new Date(actualDate.getTime() + 1 * HOUR);
        URL url = s3client.generatePresignedUrl("pl-extinguisher-csvs-bucket", fileName, expDate);
        // Map<String, String> outputMap = new LinkedHashMap<String, String>();
        // outputMap.put("csvLink", url.toExternalForm());
        // String outputJson  = gson.toJson(outputMap, Map.class);

        ApiGatewayResponse res = new ApiGatewayResponse(200, url.toExternalForm());
        return res;
    }
}