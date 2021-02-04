// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({ region: 'eu-west-1' });
var credentials = new AWS.SharedIniFileCredentials({ profile: 'cnt000' });
AWS.config.credentials = credentials;

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

var params = {
  TableName: 'ITALIAN',
  Item: {
    PAGE_ID: { S: 'errors' },
    LANGUAGE: { S: 'italian' },
    LABELS: { prova: 1 },
  },
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function (err, data) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success', data);
  }
});
