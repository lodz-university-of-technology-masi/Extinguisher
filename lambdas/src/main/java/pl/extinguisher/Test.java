package pl.extinguisher;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


class Test{
    private String recruiterID;
    private String testName;
    private List<Question> questionsList;

    public Test(String recruiterID, String testName, List<Question> questionsList) {
        this.recruiterID = recruiterID;
        this.testName = testName;
        this.questionsList = questionsList;
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

    public List<Map<String, Object>> getQuestionsListMap() throws TestException {
        List<Map<String, Object>> ret = new ArrayList<Map<String, Object>>();
        for(Question q : questionsList) {
            try {
            ret.add(q.getMap());
            }catch(QuestionException e) {
                throw new TestException(e.getMessage());
            }
        }

        return ret;
    }

    public void validateTest() throws TestException {
        if(recruiterID == "" || recruiterID == null) {
            throw new TestException("recruiterID cannot be null");
        }

        if(testName == "" || testName == null) {
            throw new TestException("testName cannot be null");
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