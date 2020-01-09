package com.serverless;

import com.amazonaws.services.dynamodbv2.document.Item;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.util.Iterator;
import java.util.UUID;

public class JsonFormatter {



    protected static String getQuestionsAsJsonString(JsonNode rootNode) {
        String questions = new String("[");

        JsonNode allQuestionsNode = rootNode.get("questionsList");
        int allQuestionsNodeSize = allQuestionsNode.size();

        for (int i = 0; i < allQuestionsNodeSize; i++) {
            JsonNode singleQuestionNode = allQuestionsNode.get(i);
            String type = singleQuestionNode.get("type").asText();
            String content = singleQuestionNode.get("questionContent").asText();

            questions += "{\"questionContent\":\"" + content + "\"," + "\"type\":\"" + type + "\"";
            questions += ","+"\"numberOfAvaibleAnswers\":\""+ singleQuestionNode.get("numberOfAvaibleAnswers").asText() + "\"";
            questions += "," + "\"language\":\"" + singleQuestionNode.get("language").asText() + "\"";
            questions += "," +"\"QuestionID\":\"" + UUID.randomUUID().toString()+"\"";
            if(singleQuestionNode.get("avaibleAnswers").asText().length()<1)
                questions += ",\"avaibleAnswers\":\"" + "_\"";
            else
                questions += ",\"avaibleAnswers\":\"" + singleQuestionNode.get("avaibleAnswers").asText() + "\"";



            if (type.contains("W")) {
                questions += "," +"\"correctArray\":\"" + singleQuestionNode.get("correctArray").asText()+"\"";
            }

            questions += "}";
            if (i != allQuestionsNodeSize - 1) {
                questions += ",";
            }
        }
        questions += "]";

        return questions;
    }

}