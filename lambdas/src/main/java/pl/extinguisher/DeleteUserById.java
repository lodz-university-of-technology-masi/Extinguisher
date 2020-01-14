
    package pl.extinguisher;

import java.io.IOException;
import java.util.*;
import java.lang.Exception;
import java.io.StringWriter;
import java.io.PrintWriter;

import com.amazonaws.services.cognitoidp.model.*;
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
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

        public class DeleteUserById implements RequestHandler<Object , ApiGatewayResponse> {
            private static final Logger LOG = LogManager.getLogger(pl.extinguisher.DeleteUserById.class);
            @Override
            public ApiGatewayResponse handleRequest(Object input, Context context) {

                context.getLogger().log("Input: " + input);
                LinkedHashMap<String, Object> inputMap;
                String userName;
                AdminDeleteUserResult result;
                final AWSCognitoIdentityProviderClient cognitoClient = new AWSCognitoIdentityProviderClient();
                try {
                    inputMap = (LinkedHashMap<String, Object>) input;
                    userName =  (String) inputMap.get("userName");
                    result = cognitoClient.adminDeleteUser(new AdminDeleteUserRequest().withUserPoolId("us-east-1_M3dMBNpHE").withUsername(userName));
                }
                catch(Exception e)
                {
                    StringWriter sw = new StringWriter();
                    PrintWriter pw = new PrintWriter(sw);
                    e.printStackTrace(pw);
                    String sStackTrace = sw.toString();
                    ApiGatewayResponse res = new ApiGatewayResponse(400, sStackTrace);
                    return res;
                }

                ApiGatewayResponse res = new ApiGatewayResponse(200,result.toString() );
                return res;
            }
        }
