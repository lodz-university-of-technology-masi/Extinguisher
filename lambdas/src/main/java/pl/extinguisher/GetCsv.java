package pl.extinguisher;

import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.AWSLambdaClient;
import com.amazonaws.regions.Regions;
import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.services.lambda.model.InvokeRequest;
import com.amazonaws.services.lambda.model.InvokeResult;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.Bucket;

import com.google.gson.Gson;
import com.opencsv.CSVWriter;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.Date;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.ByteBuffer;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.net.URL;

public class GetCsv implements RequestHandler<Object, String> {
    @Override
    public String handleRequest(Object input, Context context) {
        AWSLambdaClient lambdaClient;

        lambdaClient = new AWSLambdaClient(new EnvironmentVariableCredentialsProvider());
        lambdaClient.withRegion(Regions.US_EAST_1);

        InvokeRequest invokeRequest = new InvokeRequest();
        invokeRequest.setFunctionName("getTestByID");

        String strInput = new Gson().toJson(input, LinkedHashMap.class);
        invokeRequest.setPayload(strInput);

        InvokeResult result = lambdaClient.invoke(invokeRequest);
        ByteBuffer buffer = result.getPayload();
        String converted = "";
        try {
            converted = new String(buffer.array(), "UTF-8");
        } catch (Exception e) {
            return Response.getMessage("Error", "Error during decoding lambda getTestById invoke");
        }
        converted = converted.substring(1, converted.length() - 1);
        converted = converted.replace("\\", "");
        Gson gson = new Gson();
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
                data.add(new String[] { Integer.toString(it), question.get("type"), question.get("langugage"),
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
        AmazonS3Client s3client = new AmazonS3Client(new EnvironmentVariableCredentialsProvider());
        // String buckets = "";
        // for (Bucket bucket : s3client.listBuckets()) {
        // buckets += bucket.getName() + " ";
        // }
        s3client.putObject("pl-extinguisher-csvs-bucket", fileName, file);
        Date actualDate = new Date();
        final long HOUR = 3600*1000;
        Date expDate = new Date(actualDate.getTime() + 1 * HOUR);
        URL url = s3client.generatePresignedUrl("pl-extinguisher-csvs-bucket", fileName, expDate);
        return url.toExternalForm();
    }
}