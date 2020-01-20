import React from 'react';
import {Button} from "react-bootstrap";

const QuestionsView = (props) => {
    let questionList = [];

    for (let i = 0; i < props.questionArray.length; i++) {
        let type;
        console.log(props.questionArray);
        if (props.questionArray[i].type === "W")
            type = `Closed Question `;
        else
            type = "Open Question";
        questionList.push(<li className="list-group-item" key={i + "questionNumber"}> {props.questionArray[i].questionContent} {type}

            <Button variant="danger" onClick={() => props.handleDeleteQuestion(i)}>Delete</Button>
        </li>)
    }

    return (
        <div>
            <ul className="list-group">
            {questionList}
            </ul>
        </div>
    );
};

export default QuestionsView;
