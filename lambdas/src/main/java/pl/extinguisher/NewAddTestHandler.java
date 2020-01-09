package pl.extinguisher;

import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.regions.Regions;


import java.util.*;
import java.lang.Exception;
import java.io.StringWriter;
import java.io.PrintWriter;

import static com.amazonaws.auth.policy.Statement.Effect.Allow;
//import org.json.*;

public class NewAddTestHandler implements RequestHandler<RequestClass, Response> {
    @Override
    public Response handleRequest(RequestClass input, Context context) {
        Map<String, String> headers = new HashMap<>();
        headers.put("Access-Control-Allow-Origin", "*"); // cors header, you can add another header fields
        context.getLogger().log("Input: " + input);
        // JSONObject jsonInput = new JSONObject(input);
        //String output = jsonInput.getString("recruiterID");
        LinkedHashMap<String, Object> inputMap;
        try {
            inputMap = (LinkedHashMap<String, Object>) (Object)input;
        } catch(Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString(); // stack trace as a string

            return new Response(400,headers,sStackTrace);
        }
        // String output = inputMap.get("recruiterID");
        List<LinkedHashMap<String, String>> questionsList;
        try {
            questionsList = (ArrayList<LinkedHashMap<String, String>>) inputMap.get("questionsList");
        } catch(Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString(); // stack trace as a string

            return new Response(400,headers,sStackTrace);
        }
        // String output = "";
        // List<HashMap> hashedQList =
        for (LinkedHashMap<String, String> q : questionsList) {
            q.put("QuestionID", UUID.randomUUID().toString());
            //    HashMap<String, String> hashQuestions = new HashMap<String, String>();
            for(String key : q.keySet()) {
                if(key == "avaibleAnswers") {
                    if(q.get("avaibleAnswers") == "") {
                        q.put("avaibleAnswers", "_");
                    }
                }
            }
        }
        // LinkedHashMap<String, String> firstQuestion = (LinkedHashMap<String, String>) questionsList.get(0);
        // String firstQuestionType = firstQuestion.get("type");
        final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
        // final AmazonDynamoDBClient client = AmazonDynamoDBClientBuilder.defaultClient();
        client.withRegion(Regions.US_EAST_1); // specify the region you created the table in.
        DynamoDB dynamoDB = new DynamoDB(client);
        Table table = dynamoDB.getTable("Tests");
        final Item item = new Item()
                .withPrimaryKey("TestID", UUID.randomUUID().toString()) // Every item gets a unique id
                .withString("recruiterID", (String) inputMap.get("recruiterID"))
                .withString("testName", (String) inputMap.get("testName"))
                .withList("questionsList", questionsList);
        //         .withDouble("lat", input.getLat())
        //         .withDouble("lng", input.getLng());
        table.putItem(item);
        headers.put("Access-Control-Allow-Origin", "*"); // cors header, you can add another header fields

        return new Response(200, headers,item.toString());
    }




    // return new Response(200, headers, "{result: " + steps + "}");
    // simple json response. ex: {result: '3433"}


    public static String getMessage(String message) {
        return "{ \"message\": \"" + message + "\" }";
    }

    public static String getMessage(String message, String error) {
        return "{ \"message\": \"" + message + "\", \"error\": \"" + error + "\" }";
    }

}