import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import uuid from 'react-uuid'
import { ButtonToolbar, Dropdown } from 'react-bootstrap';

class RecruiterPlankTestListPosition extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            users: []
        }
    }

    componentDidMount() {

        this.setState({
            data: this.props.test,
            users: this.props.users
        })

    }

    createCandidatesList(){
        
        let dropDownElements = []
        dropDownElements = this.state.users.map(user => <Dropdown.Item key = {uuid()}>{user.userName}</Dropdown.Item>)
        return dropDownElements

        

    }

    render(){
        return(
            <tr>
                <td>
                    {this.state.data.testName}
                </td>
                <td>
                    {this.state.data.recruiterID}
                </td>            
                <td>
                <Link to={{
                    pathname: '/recruiterPlankTestView',
                    state: {
                        data: this.state.data
                        }
                }}>Modyfikuj test</Link>
                </td>
                <td>
                    <Dropdown>
                    <Dropdown.Toggle>
                            Wybierz Kandydata do przypisania
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {this.createCandidatesList()}
                        </Dropdown.Menu>
                    </Dropdown>
                </td>
            </tr>
        )
    }
}

export default RecruiterPlankTestListPosition;
