var xhr = new XMLHttpRequest();
var obj = {"recruiterID":"TestTestTestTest","testName":"Test5Test3Test3Test","questionsList":[{"type":"O","language":"PL","questionContent":"Opisz swoje doswiadczenie z przetwarzaniem w chmurze","numberOfAvaibleAnswers":0,"avaibleAnswers":"","correctAnswers":""},{"type":"W","language":"PL","questionContent":"Czy ty lubisz przetwarzanie w chmurze","numberOfAvaibleAnswers":2,"avaibleAnswers":"Tak|Nie","correctAnswers":"Tak"}]}
xhr.open("POST", "https://d1yalzslbd.execute-api.us-east-1.amazonaws.com/prod/tests", true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
var myJSON = JSON.stringify(obj);
xhr.send(myJSON)
xhr.response
xhr.status