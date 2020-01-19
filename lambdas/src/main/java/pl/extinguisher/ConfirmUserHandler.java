package pl.extinguisher;

import java.util.ArrayList;
import java.util.Iterator;
import java.lang.Exception;
import java.io.StringWriter;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import com.amazonaws.services.cognitoidp.model.*;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.ScanOutcome;
import com.amazonaws.services.dynamodbv2.document.spec.ScanSpec;
import com.amazonaws.services.dynamodbv2.document.ItemCollection;
import com.amazonaws.services.cognitoidp.*;
import com.google.gson.Gson;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;

public class ConfirmUserHandler implements RequestHandler<Map<String, Object> , ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Map<String, Object> request, Context context) {
        Gson gson = new Gson();
        BodyHelper bodyHelper;

        final AWSCognitoIdentityProviderClient cognitoClient = new AWSCognitoIdentityProviderClient();

        final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
        client.withRegion(Regions.US_EAST_1);

        try {
             bodyHelper = gson.fromJson(request.get("body").toString(),BodyHelper.class);
                cognitoClient.adminConfirmSignUp(new AdminConfirmSignUpRequest().withUsername(bodyHelper.userID).withUserPoolId("us-east-1_M3dMBNpHE"));
        } catch(Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();
            ApiGatewayResponse res = new ApiGatewayResponse(400, "Unable to confirm that user" + e.getMessage());
            return res;
        }
        ApiGatewayResponse res = new ApiGatewayResponse(200,"Confirmed");
        return res;
    }

    class BodyHelper{
        String userID;
    }
}