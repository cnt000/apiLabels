const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-west-1'});
const credentials = new AWS.SharedIniFileCredentials({ profile: 'cnt000' });
AWS.config.credentials = credentials;

const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});


const params = {
  TableName: 'Labels',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }, //Partition key
    { AttributeName: 'name', KeyType: 'RANGE' }, //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'N' },
    { AttributeName: 'name', AttributeType: 'S' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

ddb.createTable(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});
