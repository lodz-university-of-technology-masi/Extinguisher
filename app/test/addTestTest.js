var assert = require('assert');
XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

var ts = Math.round((new Date()).getTime() / 1000);
let unitTestName = "unit-test_" + ts;
var obj = {
    recruiterID: unitTestName,
    testName: unitTestName,
    questionsList: [
        {
            type: "O",
            language: "PL",
            questionContent: "Opisz swoje doswiadczenie z przetwarzaniem w chmurze",
            numberOfAvaibleAnswers: 0,
            avaibleAnswers: "",
            correctAnswers: ""
        },
        {
            type: "W",
            language: "PL",
            questionContent: "Czy ty lubisz przetwarzanie w chmurze",
            numberOfAvaibleAnswers: 2,
            avaibleAnswers: "Tak|Nie",
            correctAnswers: "Tak"
        }
    ]
}

describe('API Gateway add test unit test', function () {
 it('should return response status 201', function () {
    var myJSON = JSON.stringify(obj);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://d1yalzslbd.execute-api.us-east-1.amazonaws.com/prod/tests", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
            assert.equal(xhr.status, 201);
            if(xhr.status === 201) {
                assert.equal(xhr.responseText, "Created");
            }
        }
    }
    xhr.send(myJSON);

    });
 it('should return 200 and response should contain added testName', function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://d1yalzslbd.execute-api.us-east-1.amazonaws.com/prod/tests", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            //console.log(xhr.responseText);
            assert.equal(xhr.status, 200);
            if(xhr.status === 200) {
                assert.equal(xhr.responseText.includes(unitTestName), true);
            }
        }
    }
    xhr.send();
    });
});