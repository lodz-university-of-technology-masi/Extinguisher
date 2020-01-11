package pl.extinguisher;

import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.Context;
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

        // ApiGatewayResponse res = new ApiGatewayResponse(200, request.toString());
        // return res;

        // {
        //     String strInput = request.toString();
        //     Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        //     Instant instant = timestamp.toInstant();
        //     String key = instant.toString() + "_input";
        //     s3client.putObject("pl-extinguisher-logs-lambda", key, strInput);
        // }

        TestID testID;
        Gson gson = new Gson();
       // JsonObject jsonObject = gson.toJsonTree(request.get("body").toString()).getAsJsonObject();
        try {
            testID = gson.fromJson(request.get("queryStringParameters").toString(), TestID.class);
        } catch(Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();

            ApiGatewayResponse res = new ApiGatewayResponse(400, sStackTrace);
            return res;
        }

        // ApiGatewayResponse res = new ApiGatewayResponse(200, testID.getTestID());
        // return res;
        


        lambdaClient = new AWSLambdaClient(new EnvironmentVariableCredentialsProvider());
        lambdaClient.withRegion(Regions.US_EAST_1);

        InvokeRequest invokeRequest = new InvokeRequest();
        invokeRequest.setFunctionName("getTestByID");

       // LinkedHashMap<String, Object> inputMap;
      //  inputMap = (LinkedHashMap<String, Object>) input;
    //   String inputStr = request.toString();
    //   Timestamp timestamp = new Timestamp(System.currentTimeMillis());
    //   Instant instant = timestamp.toInstant();
    //   String key = instant.toString() + "_input";
    //   s3client.putObject("pl-extinguisher-logs-lambda", key, inputStr);
    //   Gson gson = new Gson();
    //   TestID testID = gson.fromJson(request.get("body").toString(), TestID.class);
        // if(inputMap.get("TestID") == null) {
            
        //     ApiGatewayResponse res = new ApiGatewayResponse(500, "wrong");
        //     return res;
        // }

        Map<String, String> lambdaPayout = new LinkedHashMap<String, String>();
        lambdaPayout.put("TestID", testID.getTestID());
        String strInput = new Gson().toJson(lambdaPayout, LinkedHashMap.class);
        invokeRequest.setPayload(strInput);

        InvokeResult result = lambdaClient.invoke(invokeRequest);
        ByteBuffer buffer = result.getPayload();
        String converted = "";
        try {
            converted = new String(buffer.array(), "UTF-8");
        } catch (Exception e) {
            ApiGatewayResponse res = new ApiGatewayResponse(400, "Error during decoding lambda getTestById invoke");
            return res;
        }
        converted = converted.substring(1, converted.length() - 1);
        converted = converted.replace("\\", "");
        Map<String, Object> map = gson.fromJson(converted, Map.class);
        // String element = (String) map.get("recruiterID");
        List<Map<String, String>> questionsList = new ArrayList<Map<String, String>>();
        questionsList = (ArrayList<Map<String, String>>) map.get("questionsList");
        int it = 1;
        // String line = "";
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        Instant instant = timestamp.toInstant();
        String fileName = "csv-" + map.get("testName") + "-" + instant.toString() + ".csv";
        File file = new File("/tmp/" + fileName);
        try {
            FileWriter outputfile = new FileWriter(file);

            // create CSVWriter with '|' as separator
            CSVWriter writer = new CSVWriter(outputfile, ';', CSVWriter.NO_QUOTE_CHARACTER,
                    CSVWriter.DEFAULT_ESCAPE_CHARACTER, CSVWriter.DEFAULT_LINE_END);
            List<String[]> data = new ArrayList<String[]>();
            for (Map<String, String> question : questionsList) {
                String avAnswers = "";
                if (question.get("avaibleAnswers").equals("_")) {
                    // line += "|;\n";
                    avAnswers = "|";
                } else {
                    // line += question.get("avaibleAnswers").replace("|", ";") + "\n";
                    avAnswers = question.get("avaibleAnswers").replace("|", ";");
                }
                data.add(new String[] { Integer.toString(it), question.get("type"), question.get("language"),
                        question.get("questionContent"), question.get("numberOfAvaibleAnswers"), avAnswers });
                // line += Integer.toString(it) + ';';
                // line += question.get("type") + ';';
                // line += question.get("langugage") + ';';
                // line += question.get("questionContent") + ';';
                // line += question.get("numberOfAvaibleAnswers") + ';';
                it += 1;
            }
            writer.writeAll(data);
            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
       // AmazonS3Client s3client = new AmazonS3Client(new EnvironmentVariableCredentialsProvider());
        s3client.putObject("pl-extinguisher-csvs-bucket", fileName, file);
        Date actualDate = new Date();
        final long HOUR = 3600*1000;
        Date expDate = new Date(actualDate.getTime() + 1 * HOUR);
        URL url = s3client.generatePresignedUrl("pl-extinguisher-csvs-bucket", fileName, expDate);

        // {
        //     Timestamp timestamp2 = new Timestamp(System.currentTimeMillis());
        //     Instant instant2 = timestamp2.toInstant();
        //     String key2 = instant2.toString() + "_res";
        //     s3client.putObject("pl-extinguisher-logs-lambda", key2, url.toExternalForm());
        // }

        ApiGatewayResponse res = new ApiGatewayResponse(200, url.toExternalForm());
        return res;
    }
}