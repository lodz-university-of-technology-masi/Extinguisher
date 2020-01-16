import React from 'react'
import {Link} from 'react-router-dom'
import "./style/TestListPosition.css"

function TestListPosition(props) {
    const isSolved = false
    //console.log(props.test.questionsList)
    return (
        <tr>
            <td>
                {props.test.testName}
            </td>
            <td>
                Warunek sprawdzajacy isSolved/isCheckd/IsPassed i wyswietlajacy odpowiedni status no to chyba trzeba przrobic na komponent calosc
            </td>
            <td>
              Pobiera wynik z wpisu do bazy danych i opisuje  wynik 
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