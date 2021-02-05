const AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-1' });
const docClient = new AWS.DynamoDB.DocumentClient();

const db = {
  insert: async (params) => {
    const resp = await docClient.put(params).promise();
    return resp;
  },
};

module.exports = { db };
