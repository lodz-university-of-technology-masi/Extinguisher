package pl.extinguisher;

import java.util.Iterator;
import java.lang.Exception;
import java.io.StringWriter;
import java.io.PrintWriter;

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

import com.google.common.collect.ImmutableMap;
import java.util.Map;

public class GetTestByID implements RequestHandler<Object, String> {
    @Override
    public String handleRequest(Object input, Context context) {
        String givenTestID = "";
        Map<String, String> inputMap = (Map<String, String>) input;
        givenTestID = inputMap.get("TestID");
        if (givenTestID == null) {
            return Response.getMessage("Unable to find in input TestID value");
        }

        final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
        client.withRegion(Regions.US_EAST_1);
        DynamoDB dynamoDB = new DynamoDB(client);
        Table table = dynamoDB.getTable("Tests");
       ScanSpec scanSpec = new ScanSpec()
       .withFilterExpression("#testid in (:val1)")
       .withNameMap(ImmutableMap.of("#testid", "TestID"))
       .withValueMap(ImmutableMap.of(":val1", givenTestID));
       String output = "";
       try {
           ItemCollection<ScanOutcome> items = table.scan(scanSpec);
           Iterator<Item> iter = items.iterator();
           while (iter.hasNext()) {
               Item item = iter.next();
               output += item.toJSON();
           }
          // output = output.substring(0, output.length() - 2);
       } catch(Exception e) {
           StringWriter sw = new StringWriter();
           PrintWriter pw = new PrintWriter(sw);
           e.printStackTrace(pw);
           String sStackTrace = sw.toString();
           return Response.getMessage("Unable to scan table", sStackTrace);
       }

       if(output.equals("")) {
           return Response.getMessage("Error", "Cannot find test with given TestID: " + givenTestID);
       }

        return output;
    }

}