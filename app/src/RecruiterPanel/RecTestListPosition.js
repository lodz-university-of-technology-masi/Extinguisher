import React from 'react'
import {Link} from 'react-router-dom'

function RecTestListPosition(props) {
    // console.log(props.test)
    return (
        <tr>
            <td>
                {props.test.testName}
            </td>
            <td>
                {props.test.recruiterID}
            </td>
            <td>
                {props.test.recruiterID}
            </td>
            <td>
              {props.minPoints}/{props.maxPoints}
            </td>
             
            <td>
              <Link to={{
                  pathname: '/recruiterTestView',
                  state: {
                      data: props.test.questionsList,
                      testID: props.test.TestID
                    }
              }}>Check Test</Link>
            </td>
        </tr>
    )
}

export default RecTestListPosition;
