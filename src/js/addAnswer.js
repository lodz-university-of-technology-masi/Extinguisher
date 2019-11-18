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
  const { QuestionID, CandidateID, AnswerContent } = JSON.parse(event.body);
  const params = {
    TableName: "Answers", // The name of your DynamoDB table
    Item: { // Creating an Item with a unique id and with the passed title
      AnswerID: generateUUID(),
      QuestionID: QuestionID,
      CandidateID: CandidateID,
      AnswerContent: AnswerContent,
      answerTimeStamp: (new Date()).toLocaleString([], timezoneOptions)
    }
  };
  try {
    // Utilising the put method to insert an item into the table (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01)
    const data = await documentClient.put(params).promise();
    const response = {
      statusCode: 200,
      body: "OK"
    };
    return response; // Returning a 200 if the item has been inserted 
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};