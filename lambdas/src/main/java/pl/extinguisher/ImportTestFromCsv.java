package pl.extinguisher;

import com.amazonaws.services.dynamodbv2.model.*;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.runtime.LambdaLogger;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.lang.Exception;
import java.io.StringWriter;
import java.io.File;
import java.io.FileReader;
import java.io.PrintWriter;

import java.util.Map;
import java.util.Scanner;

import com.google.gson.Gson;
import com.opencsv.CSVIterator;
import com.opencsv.CSVReader;



public class ImportTestFromCsv implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> request, Context context) {
        Test test = new Test();
        Gson gson = new Gson();
        Map<String, String> bodyRequest;
        bodyRequest = gson.fromJson(request.get("body").toString(), Map.class);

        test.setTestName(bodyRequest.get("testName"));
        test.setRecruiterID(bodyRequest.get("recruiterID"));

        AmazonS3Client s3client = new AmazonS3Client(new EnvironmentVariableCredentialsProvider());
        String bucketName = "pl-extinguisher-csvs-bucket";
        String fileName = bodyRequest.get("fileName");
        //S3Object csvObject = s3client.getObject(bucketName, fileName);
        File csvFile = new File("//tmp//" + fileName);
        s3client.getObject(new GetObjectRequest(bucketName, fileName), csvFile);
        CSVReader csvreader;
        String newFileName = deleteCertainCharacterFromFile(csvFile, '\"');
        File repairedCsv = new File(newFileName);
        try {
            csvreader = new CSVReader(new FileReader(repairedCsv), ';');
        }catch(Exception e) {
            ApiGatewayResponse res = new ApiGatewayResponse(400, "Unable to read csv from S3");
            return res;
        }
       // CSVIterator iterator = new CSVIterator(csvreader);
        List<Question> questionsList = new ArrayList<Question>();
        List<String[]> myData = new ArrayList<String[]>();
        try {
            myData = csvreader.readAll();
        } catch(Exception e) {
            ApiGatewayResponse res = new ApiGatewayResponse(400, "Cannot read csv");
            return res;
        }
        for(String[] nextLine : myData) {
            try {
                String temp = nextLine[0];
                int firstValue = Integer.parseInt(nextLine[0]);
                if(temp == null || temp.equals(0)) {
                    continue;
                }
            }
            catch(Exception e) {
                continue;
            }
            Question question = new Question();
            question.setType(nextLine[1]);
            question.setLanguage(nextLine[2]);
            question.setQuestionContent(nextLine[3]);
            int numberOfAnswers = 0;
            List<String> avaibleAnswers = new ArrayList<String>();
            try {
                numberOfAnswers = Integer.parseInt(nextLine[4]);
            }
            catch(Exception e) {
                question.setAvaibleAnswers(avaibleAnswers);
                questionsList.add(question);
                continue;
            }
            for(int i = 5; i < (5 + numberOfAnswers); i++) {
                avaibleAnswers.add(nextLine[i]);
            }
            question.setAvaibleAnswers(avaibleAnswers);
            questionsList.add(question);
        }
        test.setQuestionsList(questionsList);
       // ApiGatewayResponse res = new ApiGatewayResponse(200, test.toString());
        try {
        csvreader.close();
        } catch(Exception e) {

        }
       // return res;

       PutItemResult response = new PutItemResult();
       String s = "";
       try {
           test.validateTest();
           s = test.toString();
           s= s +"\n";
           s=  s + test.getAnswersList();
           final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
           client.withRegion(Regions.US_EAST_1);
           PutItemRequest requestPut = new PutItemRequest().withTableName("Tests").withReturnConsumedCapacity("TOTAL");
           Map<String, AttributeValue> map = new HashMap<>();
           map.put("testName", new AttributeValue(test.getTestName()));
           map.put("recruiterID", new AttributeValue(test.getRecruiterID()));
           map.put("questionsList", new AttributeValue().withL(test.getAttributeList()));
           map.put("userID", new AttributeValue().withS(test.getUserID()));
           map.put("answersList", new AttributeValue().withL(test.getAnswersListAttribute()));
           map.put("isSolved", new AttributeValue().withBOOL(false));
           map.put("isChecked", new AttributeValue().withBOOL(test.isChecked()));
           map.put("isPassed", new AttributeValue().withBOOL(test.isPassed()));
           map.put("result", new AttributeValue().withN((Integer.toString(test.getResult()))));




       requestPut.setItem(map);
           response = client.putItem(requestPut);



       }
       catch (Exception e) {
           StringWriter sw = new StringWriter();
           PrintWriter pw = new PrintWriter(sw);
           e.printStackTrace(pw);
           String sStackTrace = sw.toString();
           ApiGatewayResponse res = new ApiGatewayResponse(400, sStackTrace+s);
           return res;
       }

    ApiGatewayResponse res = new ApiGatewayResponse(201,response.toString() );
    return res;

    }

    public String deleteCertainCharacterFromFile(File fileToDeleteFrom, Character charr) { 
             // create scanner to read
        String newFileName = "//tmp//" + fileToDeleteFrom.getName() + "_repaired";
        PrintWriter writer;
        Scanner scanner;
        try {
            writer = new PrintWriter("//tmp//" + fileToDeleteFrom.getName() + "_repaired"); // create file to write to
            scanner = new Scanner(fileToDeleteFrom);  
        }catch(Exception e) {
            return null;
        }

        while(scanner.hasNextLine()){  // while there is a next line
            String line = scanner.nextLine();  // line = that next line

            // do something with that line
            String newLine = "";

            // replace a character
            for (int i = 0; i < line.length(); i++){
                if (line.charAt(i) != charr) {  // or anything other character you chose
                    newLine += line.charAt(i);
                }
            }

            // print to another file.
            writer.println(newLine);
        }
        writer.close();
        scanner.close();
        return newFileName;
    }
}