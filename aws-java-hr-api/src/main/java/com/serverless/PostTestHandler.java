package com.serverless;

import com.amazonaws.auth.EnvironmentVariableCredentialsProvider;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import com.amazonaws.services.dynamodbv2.document.Item;
import com.amazonaws.services.dynamodbv2.document.Table;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

import java.io.*;

import java.util.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ser.std.MapSerializer;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;


public class PostTestHandler implements RequestHandler<Map<String, Object>, ApiGatewayResponse>{
    private static final Logger LOG = LogManager.getLogger(PostTestHandler.class);
    @Override
    public ApiGatewayResponse handleRequest (Map<String, Object> input, Context context) {
        ObjectMapper objectMapper = new ObjectMapper();
        Table tests = DynamoDbController.getTable("Tests");
        JsonNode body;
        try {
            LOG.info(input);
            LOG.info("error parse json");
            body = objectMapper.readValue((String) input.get("body"), JsonNode.class);
            LOG.info(body);
        }
        catch(IOException e){
            return ApiGatewayResponse.builder()
                    .setStatusCode(400)
                    .setObjectBody("error")
                    .setHeaders(Collections.singletonMap("Access-Control-Allow-Origin","*"))
                    .build();
        }
        Item test = createTestItem(body);



HashMap<String,String> map = new HashMap<>();
map.put("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
        map.put("Access-Control-Allow-Origin","*");
        map.put("Access-Control-Allow-Headers","*");
        if(test.get("TestID").equals(""))
            return ApiGatewayResponse.builder()
                    .setStatusCode(400)
                    .setObjectBody("error")
                    .setHeaders(Collections.singletonMap("Access-Control-Allow-Origin","*"))
                    .build();

        tests.putItem(test);
        return ApiGatewayResponse.builder()
                .setStatusCode(200)
                .setObjectBody("test.asMap()")
                .setHeaders(Collections.singletonMap("Access-Control-Allow-Origin","*"))
                .build();
    }

    private Item createTestItem(JsonNode rootNode) {

        final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
        client.withRegion(Regions.US_EAST_1); // specify the region you created the table in.
        DynamoDB dynamoDB = new DynamoDB(client);
        Table table = dynamoDB.getTable("Tests");


        LOG.info(JsonFormatter.getQuestionsAsJsonString(rootNode));
        final Item item = new Item()
                .withPrimaryKey("TestID", UUID.randomUUID().toString()) // Every item gets a unique id
                .withString("recruiterID", rootNode.get("recruiterID").asText())
                .withString("testName",  rootNode.get("testName").asText())
                .withJSON("questionsList", JsonFormatter.getQuestionsAsJsonString(rootNode));

        table.putItem(item);
        return item;
    }
}