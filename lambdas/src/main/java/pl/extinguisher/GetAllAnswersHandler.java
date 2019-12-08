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

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;


public class GetAllAnswersHandler implements RequestHandler<Object, String> {
    @Override
    public String handleRequest(Object input, Context context) {
        context.getLogger().log("Input: " + input);
        final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
         client.withRegion(Regions.US_EAST_1); // specify the region you created the table in.
         DynamoDB dynamoDB = new DynamoDB(client);
         Table table = dynamoDB.getTable("TestAnswers");
        // PrimaryKey pk = new PrimaryKey("TestID", "389abb7e-a3ff-4418-8b9f-da09dfaa5300");
        // Item oneItem = table.getItem(pk);
        // return oneItem.getJSONPretty("testName");
        String output = "[";
        try {
            ItemCollection<ScanOutcome> items = table.scan(new ScanSpec());
            Iterator<Item> iter = items.iterator();
            while (iter.hasNext()) {
                Item item = iter.next();
                output += item.toJSON() + ", ";
            }
            output = output.substring(0, output.length() - 2);
            output += "]";
        } catch(Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString(); // stack trace as a string
            return AddTestHandler.getMessage("Unable to scan table", sStackTrace);
        }
        return output;
    }
}