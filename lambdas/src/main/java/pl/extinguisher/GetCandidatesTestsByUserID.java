package pl.extinguisher;

import java.util.HashMap;
import java.util.Iterator;
import java.lang.Exception;
import java.io.StringWriter;
import java.io.PrintWriter;

import com.amazonaws.services.dynamodbv2.document.*;
import com.amazonaws.services.dynamodbv2.document.spec.QuerySpec;
import com.amazonaws.services.dynamodbv2.document.spec.ScanSpec;
import com.amazonaws.services.dynamodbv2.document.utils.ValueMap;
import com.amazonaws.services.dynamodbv2.model.QueryRequest;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.runtime.Context;

import com.google.gson.Gson;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.Map;

public class GetCandidatesTestsByUserID implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    final Logger LOG = LogManager.getLogger(DeleteUserById.class);

    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> request, Context context) {

        Gson gson = new Gson();
        Map<String, String> map = (HashMap<String,String>) request.get("queryStringParameters");
        String userID = map.get("userID");
        String output = "{\"testArray\":[";

        final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
        client.withRegion(Regions.US_EAST_1);
        DynamoDB dynamoDB = new DynamoDB(client);
        Table table = dynamoDB.getTable("CandidatesTests");
        LOG.info(userID);
        try{
            ScanSpec spec = new ScanSpec().withFilterExpression("userID= :userName and attribute_exists(testName)").
                    withValueMap(new ValueMap().with(":userName", userID));


            ItemCollection<ScanOutcome> items = table.scan(spec);

            Iterator<Item> iterator = items.iterator();
            Item item = null;
            while (iterator.hasNext()) {
                item = iterator.next();
                output = output + item.toJSONPretty() + ",";
            }
            if(output.length()!=13)
            output = output.substring(0,output.length()-1);
            output = output + "]}";
        }
        catch(Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();
            ApiGatewayResponse res = new ApiGatewayResponse(400, "Unable to scan tests" + e.getMessage());
            return res;
        }
        ApiGatewayResponse res = new ApiGatewayResponse(201,output );
        return res;
    }
    class BodyHelper{
        String testName;
    }
}