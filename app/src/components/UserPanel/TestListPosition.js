import React from 'react'
import {Link} from 'react-router-dom'
import "./style/TestListPosition.css"

function TestListPosition(props) {
    const isSolved = false
   // console.log(props.test.questionsList)
    return (
        <tr>
            <td>
                {props.test.TestID}
            </td>
            <td>
                {props.test.recruiterID}
            </td>
            <td>
              {isSolved}
            </td>
            <td>
              <Link to={{
                  pathname: '/userTestView',
                  state: {
                      data: props.test.questionsList,
                      testID: props.test.TestID}
              }}>Open Test</Link>
            </td>
        </tr>
    )
}

export  default TestListPosition