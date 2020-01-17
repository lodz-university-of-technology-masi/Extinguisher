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

public class DeleteTestTemplateWithoutDeletingCandidateTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> request, Context context) {

        final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
        client.withRegion(Regions.US_EAST_1);
        DynamoDB dynamoDB = new DynamoDB(client);
        Gson gson = new Gson();
BodyHelper bodyHelper;

        DeleteItemResult response;
        int counter = 0;
        try {
            bodyHelper = gson.fromJson(request.get("body").toString(), BodyHelper.class);

            DeleteItemRequest requestDelete = new DeleteItemRequest().withTableName("Tests").withReturnConsumedCapacity("TOTAL");
            Map<String, AttributeValue> map = new HashMap<>();
            requestDelete.addKeyEntry("testName", new AttributeValue(bodyHelper.testName));
            response = client.deleteItem(requestDelete);
            requestDelete.clearKeyEntries();
            counter += response.getConsumedCapacity().getCapacityUnits();

        } catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();
            ApiGatewayResponse res = new ApiGatewayResponse(400, "Unable to delete test " + " but deleted tests to this moment number: " + counter);
            return res;
        }

        ApiGatewayResponse res = new ApiGatewayResponse(201, Integer.toString(counter) + " Tests have been deleted" + response);
        return res;
    }
    class BodyHelper{
        String testName;
    }



}

