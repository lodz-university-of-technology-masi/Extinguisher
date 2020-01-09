package com.serverless;

import com.amazonaws.services.dynamodbv2.document.Item;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.IOException;
import java.util.Iterator;
import java.util.UUID;

public class JsonFormatter {

    protected static String getCandidatesAsJsonString(
            String username, String answers, boolean passed, boolean finished, boolean rated, int points, Item test) throws IOException {
        String result = "[";
        Iterator<JsonNode> candidates = new ObjectMapper().readValue(test.getJSONPretty("candidates"), JsonNode.class).iterator();
        while (candidates.hasNext()) {
            JsonNode candidate = candidates.next();
            if (!candidate.get("username").asText().contains(username)) {
                result += getCandidateAsJsonString(candidate);
            } else {
                result += getCandidateAsJsonString(username, answers, passed, finished, rated, points);
            }
            result += candidates.hasNext() == true ? "," : "";
        }
        result += "]";
        return result;
    }

    protected static String getCandidateAsJsonString(JsonNode candidate) {
        String answersAsText = getCandidateAnswersAsJsonString(candidate.get("answers"));
        String result = "{" +
                "\"username\":\"" + candidate.get("username").asText() + "\"," +
                "\"answers\":" + answersAsText + "," +
                "\"passed\":" + candidate.get("passed").asBoolean() + "," +
                "\"finished\":" + candidate.get("finished").asBoolean() + "," +
                "\"rated\":" + candidate.get("rated").asBoolean() + "," +
                "\"points\":" + candidate.get("points").asInt() +
                "}";
        return result;
    }

    protected static String getCandidateAsJsonString(String username, String answers, boolean passed, boolean finished, boolean rated, int points) {
        String result = "{" +
                "\"username\":\"" + username + "\"," +
                "\"answers\":" + answers + "," +
                "\"passed\":" + passed + "," +
                "\"finished\":" + finished + "," +
                "\"rated\":" + rated + "," +
                "\"points\":" + points +
                "}";
        return result;
    }

    protected static String getCandidateAnswersAsJsonString(JsonNode answers) {
        String json = "[";
        for (int i = 0; i < answers.size(); i++) {
            JsonNode answer = answers.get(i);
            json += getCandidateAnswerAsJsonString(answer);
            json += i != answers.size() - 1 ? "," : "";
        }
        json += "]";
        return json;
    }

    protected static String getCandidateAnswerAsJsonString(JsonNode answer) {
        String result = "{" +
                "\"question\": \"" + answer.get("question").asText() + "\"," +
                "\"type\": \"" + answer.get("type").asText() + "\"," +
                "\"content\": \"" + answer.get("content").asText() + "\"," +
                "\"correct\": \"" + answer.get("correct").asText() + "\"," +
                "\"rated\": \"" + answer.get("rated").asText() + "\"" +
                "}";
        return result;
    }

    protected static String getCandidateAnswerAsJsonString(String question, String type, String content, boolean correct, boolean rated) {
        String result = "{" +
                "\"question\": \"" + question + "\"," +
                "\"type\": \"" + type + "\"," +
                "\"content\": \"" + content + "\"," +
                "\"correct\": \"" + correct + "\"," +
                "\"rated\": \"" + rated + "\"" +
                "}";
        return result;
    }

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

    protected static String removeAttributeFromTest(String item, String attribute) throws IOException {
        JsonNode test = new ObjectMapper().readValue(item, JsonNode.class);
        ((ObjectNode) test).remove(attribute);
        return test.toString();
    }

    protected static String removeCandidatesFromTest(String itemAsString) throws IOException {
        JsonNode test = new ObjectMapper().readValue(itemAsString, JsonNode.class);
        ((ObjectNode) test).remove("candidates");
        return test.toString();
    }

    protected static String removeCorrectAnswersFromTest(String itemAsString) throws IOException {
        JsonNode test = new ObjectMapper().readValue(itemAsString, JsonNode.class);
        JsonNode questions = test.get("questions");
        for (int i = 0; i < questions.size(); i++) {
            JsonNode question = questions.get(i);
            if (question.get("question_type").asText().contains("W")) {
                JsonNode answers = question.get("answers");
                for (int j = 0; j < answers.size(); j++) {
                    ((ObjectNode) answers.get(j)).remove("correct");
                }
            } else if (question.get("question_type").asText().contains("L")) {
                ((ObjectNode) question).remove("correct_answer");
            }
        }
        return test.toString();
    }
}