package pl.extinguisher;

import java.util.Map;
import java.util.HashMap;

class Question {
    String type;
    String language;
    String questionContent;
    Integer numberOfAvaibleAnswers;
    String avaibleAnswers;
    String correctAnswers;

    public void validateQuestion() throws QuestionException {
        if (!type.equals("O") && !type.equals("W") && !type.equals("L")) {
            throw new QuestionException("Illegal type of question. Given: " + type + " Expected: O or W or L.");
        }

        if (!language.equals("PL") && !language.equals("EN")) {
            throw new QuestionException("Illegal language. Given: " + language + "Expected: PL or EN");
        }

        if (questionContent == null || questionContent.equals("")) {
            throw new QuestionException("questionContent cannot be null");
        }

        if (numberOfAvaibleAnswers < 0 || numberOfAvaibleAnswers == null) {
            throw new QuestionException("numberOfAvaibleAnswers need to be positive integer");
        }

        if (numberOfAvaibleAnswers == 0 && !(avaibleAnswers.equals("") || avaibleAnswers.equals("_"))) {
            throw new QuestionException("avaibleAnswers should be empty when numberOfAvaibleAnswers equals 0");
        }

        if (numberOfAvaibleAnswers > 0) {
            long delimiterCount = avaibleAnswers.chars().filter(ch -> ch == '|').count();
            if ((numberOfAvaibleAnswers - 1) != delimiterCount) {
                throw new QuestionException("Missing delimiter");
            }
        }

        if (type.equals("L")) {
            String[] splittedAvaibleAnswers = avaibleAnswers.split("\\|");
            for (String answer : splittedAvaibleAnswers) {
                try {
                    double value = Double.parseDouble(answer);
                   // value += 1.0;
                } catch (Exception e) {
                    throw new QuestionException(
                            "When type equals L, all avaibleAnswers should be parsed to double. Illegal answer: "
                                    + answer);
                }
            }
        }

        if (type.equals("W")) {
            String[] splittedCorrectAnswers = correctAnswers.split("\\|");
            for (String correct : splittedCorrectAnswers) {
                if (!avaibleAnswers.contains(correct)) {
                    throw new QuestionException(
                            "correctAnswers entry should be in range of avaibleAnswers when type equals W");
                }
            }
        }
        if(avaibleAnswers.equals("") || avaibleAnswers == null || avaibleAnswers.equals("\'\'")) {
            avaibleAnswers = "_";
        }

        if(correctAnswers.equals("") || correctAnswers == null || avaibleAnswers.equals("\'\'")) {
            correctAnswers = "_";
        }
    }

    public Question(String type, String language, String questionContent, Integer numberOfAvaibleAnswers,
            String avaibleAnswers, String correctAnswers) throws QuestionException {
        this.type = type;
        this.language = language;
        this.questionContent = questionContent;
        this.numberOfAvaibleAnswers = numberOfAvaibleAnswers;
        this.avaibleAnswers = avaibleAnswers;
        this.correctAnswers = correctAnswers;
        validateQuestion();
    }

    public Map<String, Object> getMap() throws QuestionException {
        validateQuestion();
        Map<String, Object> ret = new HashMap<String, Object>();
        ret.put("type", type);
        ret.put("language", language);
        ret.put("questionContent", questionContent);
        ret.put("numberOfAvaibleAnswers", numberOfAvaibleAnswers);
        ret.put("avaibleAnswers", avaibleAnswers);
        ret.put("correctAnswers", correctAnswers);

        return ret;
    }

    @Override
    public String toString() {
        try {
            return "{" + " type='" + getType() + "'" + ", language='" + getLanguage() + "'" + ", questionContent='"
                    + getQuestionContent() + "'" + ", numberOfAvaibleAnswers='" + getNumberOfAvaibleAnswers() + "'"
                    + ", avaibleAnswers='" + getAvaibleAnswers() + "'" + ", correctAnswers='" + getCorrectAnswers()
                    + "'" + "}";
        } catch (QuestionException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return "";
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

    public Integer getNumberOfAvaibleAnswers() {
        return this.numberOfAvaibleAnswers;
    }

    public void setNumberOfAvaibleAnswers(Integer numberOfAvaibleAnswers) {
        this.numberOfAvaibleAnswers = numberOfAvaibleAnswers;
    }

    public String getAvaibleAnswers() {
        return this.avaibleAnswers;
    }

    public void setAvaibleAnswers(String avaibleAnswers) {
        this.avaibleAnswers = avaibleAnswers;
    }

    public String getCorrectAnswers() {
        return this.correctAnswers;
    }

    public void setCorrectAnswers(String correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

}