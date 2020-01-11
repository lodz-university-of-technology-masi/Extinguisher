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



public class AddTestHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> request, Context context) {
        context.getLogger().log("Input: " + request.get("body").toString());

       // ApiGatewayResponse res = new ApiGatewayResponse(201, request.get("body").toString());
//return res;

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
    //     LinkedHashMap<String, Object> inputMap;
    //     try {
    //     inputMap = (LinkedHashMap<String, Object>) input;
    //     } catch(Exception e) {
    //         StringWriter sw = new StringWriter();
    //         PrintWriter pw = new PrintWriter(sw);
    //         e.printStackTrace(pw);
    //         String sStackTrace = sw.toString();
            
    //         ApiGatewayResponse res = new ApiGatewayResponse(400, "Error during reading input to lambda");
    //         return res;
    //     }
    //    List<LinkedHashMap<String, String>> questionsList;
    //    try {
    //         questionsList = (ArrayList<LinkedHashMap<String, String>>) inputMap.get("questionsList");
    //    } catch(Exception e) {
    //         StringWriter sw = new StringWriter();
    //         PrintWriter pw = new PrintWriter(sw);
    //         e.printStackTrace(pw);
    //         String sStackTrace = sw.toString();

    //         ApiGatewayResponse res = new ApiGatewayResponse(400, "Error during constructing question list");
    //         return res;
    //    } 
    //   for(LinkedHashMap<String, String> map : questionsList) {
    //     map.put("QuestionID", UUID.randomUUID().toString());
    //     for(String key : map.keySet()) {
    //      if(map.get(key) == "") {
    //          map.put(key, "_");
    //      }
    //     }
    //   }


    //    final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
    //     client.withRegion(Regions.US_EAST_1);
    //     DynamoDB dynamoDB = new DynamoDB(client);
    //     Table table = dynamoDB.getTable("Tests");
    //      final Item item = new Item()
    //              .withPrimaryKey("TestID", UUID.randomUUID().toString())
    //              .withString("recruiterID", (String) inputMap.get("recruiterID"))
    //              .withString("testName", (String) inputMap.get("testName"))
    //              .withList("questionsList", questionsList);
    //     table.putItem(item);

    //     ApiGatewayResponse res = new ApiGatewayResponse(201, "Created");
    //     return res;
    // }

}