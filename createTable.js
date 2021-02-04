// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region
AWS.config.update({region: 'eu-west-1'});
var credentials = new AWS.SharedIniFileCredentials({ profile: 'cnt000' });
AWS.config.credentials = credentials;

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

// var params = {
//   AttributeDefinitions: [
//     {
//       AttributeName: 'PAGE_ID',
//       AttributeType: 'S',
//     },
//     {
//       AttributeName: 'LANGUAGE',
//       AttributeType: 'S',
//     },
//   ],
//   KeySchema: [
//     {
//       AttributeName: 'PAGE_ID',
//       KeyType: 'HASH',
//     },
//     {
//       AttributeName: 'LANGUAGE',
//       KeyType: 'RANGE',
//     },
//   ],
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 1,
//     WriteCapacityUnits: 1,
//   },
//   TableName: 'ITALIAN',
//   StreamSpecification: {
//     StreamEnabled: false,
//   },
// };

var params = {
  TableName: 'Movies',
  KeySchema: [
    { AttributeName: 'year', KeyType: 'HASH' }, //Partition key
    { AttributeName: 'title', KeyType: 'RANGE' }, //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: 'year', AttributeType: 'N' },
    { AttributeName: 'title', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

// Call DynamoDB to create the table
ddb.createTable(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});
