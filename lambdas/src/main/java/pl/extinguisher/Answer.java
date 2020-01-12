package pl.extinguisher;

import java.util.Map;
import java.util.List;
import java.util.HashMap;

class Answer {
    String testID;
    String candidateID;
    List<Map<String, String>> answersList;


    public Answer(String testID, String candidateID, List<Map<String,String>> answersList) {
        this.testID = testID;
        this.candidateID = candidateID;
        this.answersList = answersList;
    }


    @Override
    public String toString() {
        return "{" +
            " testID='" + getTestID() + "'" +
            ", candidateID='" + getCandidateID() + "'" +
            ", answersList='" + getAnswersList() + "'" +
            "}";
    }



    public String getTestID() {
        return this.testID;
    }

    public void setTestID(String testID) {
        this.testID = testID;
    }

    public String getCandidateID() {
        return this.candidateID;
    }

    public void setCandidateID(String candidateID) {
        this.candidateID = candidateID;
    }

    public List<Map<String,String>> getAnswersList() {
        return this.answersList;
    }

    public void setAnswersList(List<Map<String,String>> answersList) {
        this.answersList = answersList;
    }
}