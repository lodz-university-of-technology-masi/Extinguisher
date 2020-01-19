package pl.extinguisher;

import java.util.*;
import java.lang.Exception;
import java.io.StringWriter;
import java.io.PrintWriter;

import com.amazonaws.services.cognitoidp.model.*;
import com.amazonaws.services.dynamodbv2.model.*;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.ScanOutcome;
import com.amazonaws.services.dynamodbv2.document.spec.ScanSpec;
import com.amazonaws.services.dynamodbv2.document.ItemCollection;
import com.amazonaws.services.cognitoidp.*;
import com.google.gson.Gson;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
public class DeleteTestCandidate implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> request, Context context) {

        final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
        client.withRegion(Regions.US_EAST_1);
        DynamoDB dynamoDB = new DynamoDB(client);
        Map<String, String> map = (HashMap<String,String>) request.get("queryStringParameters");
        Table table = dynamoDB.getTable("CandidatesTests");

        DeleteItemResult response = new DeleteItemResult();
        int counter=0;
        try{
            String testName = map.get("testName");
            String userName = map.get("userName");
            DeleteItemRequest requestDelete = new DeleteItemRequest().withTableName("CandidatesTests").withReturnConsumedCapacity("TOTAL");



            requestDelete.addKeyEntry("userID",new AttributeValue(userName));
            requestDelete.addKeyEntry("testName",new AttributeValue(testName));
            response =  client.deleteItem(requestDelete);
            requestDelete.clearKeyEntries();


        }
        catch(Exception e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        String sStackTrace = sw.toString();
        ApiGatewayResponse res = new ApiGatewayResponse(400, "Unable to delete test ");
        return res;
    }

    ApiGatewayResponse res = new ApiGatewayResponse(201, " Tests have been deleted" + response);
        return res;
}




}

