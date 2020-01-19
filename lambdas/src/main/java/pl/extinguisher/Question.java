package pl.extinguisher;

import com.amazonaws.services.dynamodbv2.model.AttributeValue;

import com.amazonaws.services.lambda.runtime.LambdaLogger;
import java.util.*;

class Question {
    String type;
    String language;
    String questionContent;
    List<String> availableAnswers;
    List<String> correctAnswers;

    public void validateQuestion() throws QuestionException {


        if (!type.equals("O") && !type.equals("W")) {
            throw new QuestionException("Illegal type of question. Given: " + type + " Expected: O or W.");
        }

        if (!language.equals("PL") && !language.equals("EN")) {
            throw new QuestionException("Illegal language. Given: " + language + "Expected: PL or EN");
        }

        if (questionContent == null || questionContent.equals("")) {
            throw new QuestionException("questionContent cannot be null");
        }


    }

    public Question(String type, String language, String questionContent,
            List<String> availableAnswers, List<String> correctAnswers) throws QuestionException {
        this.type = type;
        this.language = language;
        this.questionContent = questionContent;
        this.availableAnswers = availableAnswers;
        this.correctAnswers = correctAnswers;
        validateQuestion();
    }

    public Map<String, Object> getMap() throws QuestionException {
        validateQuestion();
        Map<String, Object> ret = new HashMap<String, Object>();
        ret.put("type", type);
        ret.put("language", language);
        ret.put("questionContent", questionContent);
        ret.put("availableAnswers", availableAnswers);
        ret.put("correctAnswers", correctAnswers);

        return ret;
    }
    public Map<String, AttributeValue> getAttributeValueMap() throws QuestionException {
        validateQuestion();
        Map<String, AttributeValue> ret = new HashMap<String,AttributeValue>();
        List<AttributeValue> list = new ArrayList<>();
        for(int i=0;i<availableAnswers.size();i++)
        {
            list.add(new AttributeValue(availableAnswers.get(i)));
        }
        ret.put("availableAnswers",  new AttributeValue().withL(list));
        list = new ArrayList<>();
        for(int i=0;i<correctAnswers.size();i++)
        {
            list.add(new AttributeValue(correctAnswers.get(i)));
        }
        ret.put("correctAnswers",  new AttributeValue().withL(list));
        ret.put("type",  new AttributeValue(type));
        ret.put("language",  new AttributeValue(language));
        ret.put("questionContent",  new AttributeValue(questionContent));
        return ret;
    }


    @Override
    public String toString() {
        try {
        return "{" +
            " type='" + getType() + "'" +
            ", language='" + getLanguage() + "'" +
            ", questionContent='" + getQuestionContent() + "'" +
            ", availableAnswers='" + getAvailableAnswers().toString() + "'" +
            ", correctAnswers='" + getCorrectAnswers() + "'" +
            "}";
        }catch(Exception e) {
                return e.getMessage();
            }
    }
    



    public String getType() throws QuestionException {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLanguage() throws QuestionException {
        return this.language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getQuestionContent() {
        return this.questionContent;
    }

    public void setQuestionContent(String questionContent) {
        this.questionContent = questionContent;
    }

    public List<String> getAvailableAnswers() {
        return availableAnswers;
    }

    public List<String> getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(List<String> correctAnswers) {
        this.correctAnswers = correctAnswers;
    }
}