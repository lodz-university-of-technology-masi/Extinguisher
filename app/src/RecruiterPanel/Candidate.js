import React from 'react';
import {Button} from "react-bootstrap";
import * as Api from "../api/Api"

const Candidate = (props) => {
    const {candidate} = props;
    return (
        <tr>
            <th>{candidate.userName}</th>
            <td>{candidate.custom_role}</td>
            <td><Button variant="danger" onClick={() => {
                Api.deleteUser(candidate.userName)
            }}>X</Button></td>
        </tr>
    );
};

export default Candidate;