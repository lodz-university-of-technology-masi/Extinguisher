package pl.extinguisher;

import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.runtime.LambdaLogger;

import java.util.LinkedHashMap;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.lang.Exception;
import java.io.StringWriter;
import java.io.PrintWriter;

import java.util.Map;
import com.google.gson.Gson;

public class AddAnswerHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> request, Context context) {

        context.getLogger().log("Input: " + request.toString());
        
        Answer answer;
        Gson gson = new Gson();

        try {
            answer = gson.fromJson(request.get("body").toString(), Answer.class);
        }
            catch(Exception e) {
                StringWriter sw = new StringWriter();
                PrintWriter pw = new PrintWriter(sw);
                e.printStackTrace(pw);
                String sStackTrace = sw.toString();

                ApiGatewayResponse res = new ApiGatewayResponse(400, sStackTrace);
                return res;
            }

            final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
            client.withRegion(Regions.US_EAST_1);
            DynamoDB dynamoDB = new DynamoDB(client);
            Table table = dynamoDB.getTable("TestAnswers");
                final Item item = new Item()
                        .withPrimaryKey("TestAnswerID", UUID.randomUUID().toString())
                        .withString("CandidateID", answer.getCandidateID())
                        .with("TestID", answer.getTestID())
                        .withList("answersList", answer.getAnswersList());
            table.putItem(item);

        ApiGatewayResponse res = new ApiGatewayResponse(201, "Created");

        return res;
    }
}