const AWS = require("aws-sdk");
const crypto = require("crypto");

// Generate unique id with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString("hex");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

var timezoneOptions = {
    timeZone: 'Europe/Warsaw',
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
},
    formatter = new Intl.DateTimeFormat([], timezoneOptions)
formatter.format(new Date())

exports.handler = async event => {
  const { RecruterID, type, language, questionContent, numberOfAvaibleAnswers, avaibleAnswers } = JSON.parse(event.body);
  const params = {
    TableName: "Questions", // The name of your DynamoDB table
    Item: { // Creating an Item with a unique id and with the passed title
      QuestionID: generateUUID(),
      RecruterID: RecruterID,
      type: type,
      language: language,
      questionContent: questionContent,
      numberOfAvaibleAnswers: numberOfAvaibleAnswers,
      avaibleAnswers: avaibleAnswers,
      questionTimeStamp: (new Date()).toLocaleString([], timezoneOptions)
    }
  };
  try {
    // Utilising the put method to insert an item into the table (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01)
    const data = await documentClient.put(params).promise();
    const response = {
      statusCode: 200,
    };
    return response; // Returning a 200 if the item has been inserted 
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};``