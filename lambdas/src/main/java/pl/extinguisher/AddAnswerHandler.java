package pl.extinguisher;

import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.regions.Regions;


import java.util.UUID;
import java.lang.Exception;
import java.io.StringWriter;
import java.io.PrintWriter;

import java.util.Map;
import com.google.gson.Gson;



public class AddAnswerHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> request, Context context) {
        context.getLogger().log("Input: " + request.get("body").toString());

        context.getLogger().log("Input: " + request.toString());
        Test test;
        Gson gson = new Gson();
       // JsonObject jsonObject = gson.toJsonTree(request.get("body").toString()).getAsJsonObject();
        try {
            test = gson.fromJson(request.get("body").toString(), Test.class);
        } catch(Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();

            ApiGatewayResponse res = new ApiGatewayResponse(400, sStackTrace);
            return res;
        }

        try {
            test.validateTest();
        } catch(TestException e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();

            ApiGatewayResponse res = new ApiGatewayResponse(400, sStackTrace);
            return res;
        }

        context.getLogger().log("Input222222: " + test.toString());

        final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
        client.withRegion(Regions.US_EAST_1);
        DynamoDB dynamoDB = new DynamoDB(client);
        Table table = dynamoDB.getTable("Tests");
        Item item;
        try {
        item = new Item()
                 .withPrimaryKey("TestID", UUID.randomUUID().toString())
                 .withString("recruiterID", test.getRecruiterID())
                 .withString("testName", test.getTestName())
                 .withList("questionsList", test.getQuestionsListMap());
        }catch(Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();
            ApiGatewayResponse res = new ApiGatewayResponse(400, sStackTrace);
            return res;
        }
        table.putItem(item);

        ApiGatewayResponse res = new ApiGatewayResponse(201, "Created");
        return res;
        
}