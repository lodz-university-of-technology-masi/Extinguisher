package pl.extinguisher;

import java.util.ArrayList;
import java.util.Iterator;
import java.lang.Exception;
import java.io.StringWriter;
import java.io.PrintWriter;
import java.util.List;

import com.amazonaws.services.cognitoidp.model.AttributeType;
import com.amazonaws.services.cognitoidp.model.ListUsersRequest;
import com.amazonaws.services.cognitoidp.model.ListUsersResult;
import com.amazonaws.services.cognitoidp.model.UserType;
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
import com.amazonaws.services.lambda.runtime.LambdaLogger;
public class GetAllUsersHandler implements RequestHandler<Object, ApiGatewayResponse> {
    @Override
    public ApiGatewayResponse handleRequest(Object input, Context context) {
        context.getLogger().log("Input: " + input);
        final AWSCognitoIdentityProviderClient cognitoClient = new AWSCognitoIdentityProviderClient();

        final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
        client.withRegion(Regions.US_EAST_1);
        String output = "{\"userArray\":[";
        try {
            ListUsersRequest listUsersRequest = new ListUsersRequest().withUserPoolId("us-east-1_M3dMBNpHE");
            ListUsersResult requestResult = cognitoClient.listUsers(listUsersRequest);

            List<UserType> listResult = new ArrayList<>();
            listResult.addAll(requestResult.getUsers());
            while(requestResult.getPaginationToken()!= null) {

                listUsersRequest.setPaginationToken(requestResult.getPaginationToken());

                requestResult = cognitoClient.listUsers(listUsersRequest);
                listResult.addAll(requestResult.getUsers());
            }
                for (int i = 0; i < listResult.size(); i++) {
                    output += "{";
                    output += "\"userName\":\"" + listResult.get(i).getUsername() + "\",";
                    List<AttributeType> attributes = listResult.get(i).getAttributes();
                    for (int j = 0; j < attributes.size(); j++) {
                        if (attributes.get(j).getName().equals("custom:role"))
                            attributes.get(j).setName("custom_role");
                        output += "\"" + attributes.get(j).getName() + "\":\"" + attributes.get(j).getValue() + "\",";
                    }
                    output = output.substring(0, output.length() - 1);
                    output += "},";
                }
                output = output.substring(0, output.length() - 1);
                output += "]}";
            } catch(Exception e){
                StringWriter sw = new StringWriter();
                PrintWriter pw = new PrintWriter(sw);
                e.printStackTrace(pw);
                String sStackTrace = sw.toString();
                ApiGatewayResponse res = new ApiGatewayResponse(400, "Unable to scan users" + e.getMessage());
                return res;
            }

        ApiGatewayResponse res = new ApiGatewayResponse(200, output);
        return res;
    }
}