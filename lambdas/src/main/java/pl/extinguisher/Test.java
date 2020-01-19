package pl.extinguisher;

import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import org.w3c.dom.Attr;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


class Test{
    private String recruiterID;
    private String testName;
    private List<Question> questionsList;
    private List<String> answersList;
    private String userID;
    private boolean isSolved;
    private boolean isChecked;
    private boolean isPassed;
    private int result;

    public Test(String recruiterID, String testName, List<Question> questionsList, List<String> answersList, String userID, boolean isSolved, boolean isChecked, boolean isPassed, int result) {
        this.recruiterID = recruiterID;
        this.testName = testName;
        this.questionsList = questionsList;
        this.answersList = answersList;
        this.userID = userID;
        this.isSolved = isSolved;
        this.isChecked = isChecked;
        this.isPassed = isPassed;
        this.result = result;
    }

    Test() {
        this.userID = "-";
        this.isSolved = false;
        this.isChecked = false;
        this.isPassed = false;
        this.result = -1;
        this.answersList = new ArrayList<String>();
    }

    public List<String> getAnswersList() {
        return answersList;
    }
public List<AttributeValue> getAnswersListAttribute(){
        ArrayList<AttributeValue> list = new ArrayList<>();
        for(int i=0;i<answersList.size();i++)
            list.add(new AttributeValue(answersList.get(i)));
        return list;
}

    public List<AttributeValue> getAnswersListAttributeForCandidateUpdate(){
        ArrayList<AttributeValue> list = new ArrayList<>();
        for(int i=0;i<answersList.size();i++) {
            list.add(new AttributeValue(answersList.get(i)));
        }
            return list;
    }
    public String getUserID() {
        return userID;
    }

    public boolean isSolved() {
        return isSolved;
    }

    public boolean isChecked() {
        return isChecked;
    }

    public boolean isPassed() {
        return isPassed;
    }

    public int getResult() {
        return result;
    }

    @Override
    public String toString() {
        try {
        return "{" +
            " recruiterID='" + getRecruiterID() + "'" +
            ", testName='" + getTestName() + "'" +
            ", questionsList='" + getQuestionsList().toString() + "'" +
            "}";
        }catch(Exception e) {
            e.printStackTrace();
            return "";
        }
    }


    public List<AttributeValue> getAttributeList() throws TestException{
        List <AttributeValue> list = new ArrayList<>();
        for(Question q:questionsList) {
            try {
                list.add(new AttributeValue().withM(q.getAttributeValueMap()));
            }
            catch(QuestionException e){
                throw new TestException((e.getMessage()));
            }
        }


        return list;
    }

    public void validateTest() throws TestException {
        if(recruiterID.equals("") || recruiterID == null) {
            throw new TestException("recruiterID cannot be null");
        }

        if(testName.equals("") || testName == null) {
            throw new TestException("testName cannot be null");
        }

        if(questionsList == null) {
            throw new TestException("Cannot initialize questionsList. Given questionsList: " + questionsList.toString());
        }

        if(questionsList.size() == 0) {
            throw new TestException("questionsList size cannot be 0");
        }
    }

    

    public String getRecruiterID() {
        return this.recruiterID;
    }

    public void setRecruiterID(String recruiterID) {
        this.recruiterID = recruiterID;
    }

    public String getTestName() {
        return this.testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public List<Question> getQuestionsList() {
        return this.questionsList;
    }

    public void setQuestionsList(List<Question> questionsList) {
        this.questionsList = questionsList;
    }



}