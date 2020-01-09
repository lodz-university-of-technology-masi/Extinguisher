import React from 'react';

const QuestionsView = (props) => {
    let questionList = [];

    for (let i = 0; i < this.props.questionArray.length; i++) {
        let type;
        console.log(this.props.questionArray);
        if (this.props.questionArray[i].type === "W")
            type = `Closed Question with ${this.props.questionArray[i].numberOfAvaibleAnswers} answers`;
        else
            type = "Open Question";
        questionList.push(<li key={i + "questionNumber"}> {this.props.questionArray[i].questionContent} {type}
            <button onClick={() => this.props.handleDeleteQuestion(i)}>Delete</button>
        </li>)
    }

    return (
        <div>
            {questionList}
        </div>
    );
};

export default QuestionsView;
