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


import java.util.LinkedHashMap;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.lang.Exception;
import java.io.StringWriter;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.HashMap;


public class ModifyTestHandler implements RequestHandler<Object, String> {
    @Override
    public String handleRequest(Object input, Context context) {
        context.getLogger().log("Input: " + input);
        LinkedHashMap<String, Object> inputMap;
        try {
        inputMap = (LinkedHashMap<String, Object>) input;
        } catch(Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();
            return Response.getMessage("Error", sStackTrace);
        }
       List<LinkedHashMap<String, String>> modifiedQuestionsList;
       try {
            modifiedQuestionsList = (ArrayList<LinkedHashMap<String, String>>) inputMap.get("questionsList");
       } catch(Exception e) {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            String sStackTrace = sw.toString();
            return Response.getMessage("Error", sStackTrace);
       }
       String testIDToModify = (String) inputMap.get("TestID");

       final AmazonDynamoDBClient client = new AmazonDynamoDBClient(new EnvironmentVariableCredentialsProvider());
       client.withRegion(Regions.US_EAST_1);
       DynamoDB dynamoDB = new DynamoDB(client);
       Table table = dynamoDB.getTable("Tests");
       ScanSpec scanSpec = new ScanSpec()
       .withFilterExpression("#testid in (:val1)")
       .withNameMap(ImmutableMap.of("#testid", "TestID"))
       .withValueMap(ImmutableMap.of(":val1", testIDToModify));
       List<Item> foundedTests = new ArrayList<Item>();
       try {
        ItemCollection<ScanOutcome> items = table.scan(scanSpec);
        Iterator<Item> iter = items.iterator();
        while (iter.hasNext()) {
            Item item = iter.next();
            foundedTests.add(item);
        }
    } catch(Exception e) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
        String sStackTrace = sw.toString();
        return Response.getMessage("Unable to scan table", sStackTrace);
    }
    if(foundedTests.size() != 1) {
        return Response.getMessage("Error", "Cannot find test with given TestID");
    }

    Item testToModify = foundedTests.get(0);
    for(String key : testToModify.asMap().keySet()) {
        if(key != "questionsList" && key != "TestID") {
            String newValue = (String) inputMap.get(key);
            //context.getLogger().log("key: " + key + "\n");
            if(newValue != "" && newValue != testToModify.getString(key)) {
                table.updateItem("TestID", testIDToModify, new AttributeUpdate(key).put(newValue));
            }
        }
    }

    List<LinkedHashMap<String, String>> desiredTestQuestionsList = testToModify.getList("questionsList");
    HashMap<String, Integer> questionsToModifyIDs = new HashMap<String, Integer>();
    List<Integer> newQuestionsIndexList = new ArrayList<Integer>();
    int it = 0;
    for(LinkedHashMap<String, String> newQuestion : modifiedQuestionsList) {
        if(newQuestion.keySet().contains("QuestionID")) {
            questionsToModifyIDs.put(newQuestion.get("QuestionID"), it);
        }
        else {
            newQuestionsIndexList.add(it);
        }
        it++;
    }

    
    for(LinkedHashMap<String, String> question : desiredTestQuestionsList) {
        if(questionsToModifyIDs.keySet().contains(question.get("QuestionID"))) {
            Integer modifiedQuestionIndex = questionsToModifyIDs.get(question.get("QuestionID"));
            LinkedHashMap<String, String> modifiedQuestion = modifiedQuestionsList.get(modifiedQuestionIndex);
            for(String key : question.keySet()) {
                String newValue = modifiedQuestion.get(key);
                if(newValue != "" && newValue != question.get(key)) {
                    question.put(key, newValue);
                }
            }
        }
    }

    for(Integer newQuestionIndex : newQuestionsIndexList) {
        LinkedHashMap<String, String> newQuestion = modifiedQuestionsList.get(newQuestionIndex);
        newQuestion.put("QuestionID", UUID.randomUUID().toString());
        desiredTestQuestionsList.add(newQuestion);
    }

    for(LinkedHashMap<String, String> question : desiredTestQuestionsList) {
        if(question.get("numberOfAvaibleAnswers") == "0") {
            question.put("avaibleAnswers", "_");
            question.put("correctAnswers", "_");
        }
        for(String key : question.keySet()) {
            if(question.get(key) == "") {
                question.put(key, "_");
            }
        }
    }

    table.updateItem("TestID", testIDToModify, new AttributeUpdate("questionsList").put(desiredTestQuestionsList));

    return Response.getMessage("Ok");
    }
}