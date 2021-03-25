const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
const credentials = new AWS.SharedIniFileCredentials({ profile: 'cnt000' });
AWS.config.credentials = credentials;

const params = {
  TableName: 'Labels',
  Limit: 10,
};

const documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.scan(params, function (err, data) {
  if (err) console.log(err);
  else console.log(data);
});
