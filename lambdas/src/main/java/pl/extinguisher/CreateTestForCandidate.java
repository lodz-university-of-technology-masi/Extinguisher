package pl.extinguisher;

import java.util.*;
import java.lang.Exception;
import java.io.StringWriter;
import java.io.PrintWriter;

import com.amazonaws.services.cognitoidp.model.*;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.PutItemRequest;
import com.amazonaws.services.dynamodbv2.model.PutItemResult;
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

public class CreateTestForCandidate implements RequestHandler<Map<String, Object>, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> request, Context context) {

        final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
        client.withRegion(Regions.US_EAST_1);
        DynamoDB dynamoDB = new DynamoDB(client);
        Test test;
        Gson gson = new Gson();
        Table table = dynamoDB.getTable("CandidatesTests");
        Item item;
        BodyHelper bodyHelper;
        PutItemResult response = new PutItemResult();
      try{
          bodyHelper = gson.fromJson(request.get("body").toString(), BodyHelper.class);
          PutItemRequest requestPut = new PutItemRequest().withTableName("CandidatesTests").withReturnConsumedCapacity("TOTAL");
          Map<String, AttributeValue> map = new HashMap<>();
          map.put("testName", new AttributeValue(bodyHelper.test.getTestName()));
          map.put("recruiterID", new AttributeValue(bodyHelper.test.getRecruiterID()));
          map.put("questionsList", new AttributeValue().withL(bodyHelper.test.getAttributeList()));
          map.put("userID", new AttributeValue().withS(bodyHelper.candidates.get(0)));
          map.put("answersList", new AttributeValue().withL(bodyHelper.test.getAnswersListAttribute()));
          map.put("isSolved", new AttributeValue().withBOOL(false));
          map.put("isChecked", new AttributeValue().withBOOL(bodyHelper.test.isChecked()));
          map.put("isPassed", new AttributeValue().withBOOL(bodyHelper.test.isPassed()));
          map.put("result", new AttributeValue().withN((Integer.toString(bodyHelper.test.getResult()))));
          requestPut.setItem(map);
          client.putItem(requestPut);
          for(int i=1;i<bodyHelper.candidates.size();i++) {

              requestPut = new PutItemRequest().withTableName("CandidatesTests").withReturnConsumedCapacity("TOTAL");
              map.replace("userID",new AttributeValue().withS(bodyHelper.candidates.get(i)));
              requestPut.setItem(map);
              client.putItem(requestPut);

          }

          } catch(Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();
            ApiGatewayResponse res = new ApiGatewayResponse(400, "Unable to create test" + e.getMessage());
            return res;
        }

        ApiGatewayResponse res = new ApiGatewayResponse(201, Integer.toString(bodyHelper.candidates.size()) + " Tests have been created");
        return res;
    }

    class BodyHelper{
        List<String> candidates;
        Test test;

        public BodyHelper(List<String> candidates, Test test) {
            this.candidates = candidates;
            this.test = test;
        }
    }

}

