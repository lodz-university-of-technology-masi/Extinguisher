import React from 'react';
import {Button} from "react-bootstrap";
import * as Api from "../api/Api"

const Candidate = (props) => {
    const {candidate} = props;
    return (
        <tr>
            <th>{candidate.userName}</th>
            <th>{candidate.custom_role}</th>
            <th><Button variant="danger" onClick={() => {
                Api.deleteUser(candidate.userName)
            }}>X</Button></th>
        </tr>
    );
};

export default Candidate;