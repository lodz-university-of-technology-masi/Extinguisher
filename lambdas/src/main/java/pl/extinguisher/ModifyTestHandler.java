package pl.extinguisher;

import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.document.ScanOutcome;
import com.amazonaws.services.dynamodbv2.document.spec.ScanSpec;
import com.amazonaws.services.dynamodbv2.document.ItemCollection;
import com.google.common.collect.ImmutableMap;
import com.amazonaws.services.dynamodbv2.document.AttributeUpdate;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.AttributeValueUpdate;
import com.amazonaws.services.dynamodbv2.model.ReturnConsumedCapacity;
import com.amazonaws.services.dynamodbv2.model.ReturnValue;
import com.amazonaws.services.dynamodbv2.model.UpdateItemRequest;
import com.amazonaws.services.dynamodbv2.model.UpdateItemResult;
import com.google.gson.Gson;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.amazonaws.services.lambda.runtime.LambdaLogger;
import java.util.*;
import java.lang.Exception;
import java.io.StringWriter;
import java.io.PrintWriter;


public class ModifyTestHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    final Logger LOG = LogManager.getLogger(DeleteUserById.class);

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> request, Context context) {

        Test test;
        Gson gson = new Gson();
        // JsonObject jsonObject = gson.toJsonTree(request.get("body").toString()).getAsJsonObject();
        try {
            LOG.info(request.get("body").toString());

            test = gson.fromJson(request.get("body").toString(), Test.class);
            LOG.info(test.getQuestionsList().toString());
            test.validateTest();
        } catch (TestException e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();

            ApiGatewayResponse res = new ApiGatewayResponse(400, sStackTrace);
            return res;
        }
        UpdateItemResult result = new UpdateItemResult();

        final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
        client.withRegion(Regions.US_EAST_1);
        UpdateItemRequest requestUpdate = new UpdateItemRequest();
        requestUpdate.setTableName("Tests");
        requestUpdate.setReturnConsumedCapacity(ReturnConsumedCapacity.TOTAL);
        requestUpdate.setReturnValues(ReturnValue.UPDATED_OLD);
        Map<String, AttributeValue> keysMap = new HashMap<>();
        keysMap.put("testName", new AttributeValue(test.getTestName()));
        requestUpdate.setKey(keysMap);

        Map<String, AttributeValueUpdate> map = new HashMap<>();


        try{
            map.put("questionsList", new AttributeValueUpdate(new AttributeValue().withL(test.getAttributeList()),"PUT"));
            requestUpdate.setAttributeUpdates(map);
         result =  client.updateItem(requestUpdate);

        }
        catch (Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();
            ApiGatewayResponse res = new ApiGatewayResponse(400, sStackTrace);
            return res;
        }
        /* Create a Map of Primary Key attributes */

        ApiGatewayResponse res = new ApiGatewayResponse(201, "Updated" + result.toString());
        return res;

    }

}
