import React, {Component} from 'react';
import * as Api from '../api/Api'
import RecruiterAssignedTestListPosition from "./RecruiterAssignedTests/RecruiterAssignedTestsListPosition";
import uuid from "react-uuid";
import {Container, Spinner} from "react-bootstrap";
import Candidate from "./Candidate";

class DisplayAllCandidates extends Component {
    state = {users: [], loading: true};
    componentDidMount = async () => {
        await Api.getUsers().then(users => {
            this.setState({users: users.userArray, loading: false})
        })

    }

    render() {
        const {users, loading} = this.state;
        return (

            <Container>
                <table className={"table table-hover"}>
                    <thead className={"thead-dark"}>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length > 0 && users.map(user =>
                        <Candidate key={user.userName} candidate={user}/>)}
                    </tbody>
                </table>
            </Container>

        )
            ;
    }
}

export default DisplayAllCandidates;