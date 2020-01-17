package pl.extinguisher;

import com.amazonaws.services.dynamodbv2.model.*;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.regions.Regions;


import java.util.HashMap;
import java.util.UUID;
import java.lang.Exception;
import java.io.StringWriter;
import java.io.PrintWriter;

import java.util.Map;
import com.google.gson.Gson;



public class AddTestHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> request, Context context) {
        Test test;
        Gson gson = new Gson();
        String s = "";
        PutItemResult response = new PutItemResult();
        try {
            test = gson.fromJson(request.get("body").toString(), Test.class);
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
        /* Create a Map of Primary Key attributes */

        ApiGatewayResponse res = new ApiGatewayResponse(201,response.toString() );
        return res;


    }


}