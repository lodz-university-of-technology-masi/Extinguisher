package pl.extinguisher;

import java.util.*;
import java.lang.Exception;
import java.io.StringWriter;
import java.io.PrintWriter;

import com.amazonaws.services.cognitoidp.model.*;
import com.amazonaws.services.dynamodbv2.document.*;
import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
import com.amazonaws.services.dynamodbv2.document.utils.ValueMap;
import com.amazonaws.services.dynamodbv2.model.*;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.document.spec.ScanSpec;
import com.amazonaws.services.cognitoidp.*;
import com.google.gson.Gson;

public class DeleteTestTemplateWithDeletingCandidateTest implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> request, Context context) {

        final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
        client.withRegion(Regions.US_EAST_1);
        DynamoDB dynamoDB = new DynamoDB(client);
        Gson gson = new Gson();

        BodyHelper bodyHelper;
        Table table = dynamoDB.getTable("CandidatesTests");
        DeleteItemResult response = new DeleteItemResult();
        int counter = 0;
        try {
            bodyHelper = gson.fromJson(request.get("body").toString(), BodyHelper.class);
            DeleteItemRequest requestDelete = new DeleteItemRequest().withTableName("Tests").withReturnConsumedCapacity("TOTAL");
            Map<String, AttributeValue> map = new HashMap<>();

                requestDelete.addKeyEntry("testName", new AttributeValue(bodyHelper.testName));
                response = client.deleteItem(requestDelete);
                requestDelete.clearKeyEntries();
                counter += response.getConsumedCapacity().getCapacityUnits();


            QuerySpec spec = new QuerySpec()
                    .withKeyConditionExpression("testName= :givenTest")
                    .withValueMap(new ValueMap()
                            .withString(":givenTest", bodyHelper.testName));

            ItemCollection<QueryOutcome> items = table.query(spec);
            Iterator<Item> iterator = items.iterator();
            Item item;
            while (iterator.hasNext()) {
                item = iterator.next();
                String userName = item.getString("userID");

                requestDelete = new DeleteItemRequest().withTableName("CandidatesTests").withReturnConsumedCapacity("TOTAL");
                requestDelete.addKeyEntry("testName", new AttributeValue(bodyHelper.testName));
                requestDelete.addKeyEntry("userID",new AttributeValue(userName));
                response = client.deleteItem(requestDelete);
                requestDelete.clearKeyEntries();
                counter += response.getConsumedCapacity().getCapacityUnits();

            }

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

