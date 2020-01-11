import React from 'react';

const QuestionsView = (props) => {
    let questionList = [];

    for (let i = 0; i < props.questionArray.length; i++) {
        let type;
        console.log(props.questionArray);
        if (props.questionArray[i].type === "W")
            type = `Closed Question with ${props.questionArray[i].numberOfAvaibleAnswers} answers`;
        else
            type = "Open Question";
        questionList.push(<li key={i + "questionNumber"}> {props.questionArray[i].questionContent} {type}
            <button onClick={() => props.handleDeleteQuestion(i)}>Delete</button>
        </li>)
    }

    return (
        <div>
            {questionList}
        </div>
    );
};

export default QuestionsView;
