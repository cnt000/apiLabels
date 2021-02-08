const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
  let data;
  try {
    const { id } = JSON.parse(event.body);
    const tableName = 'Labels';

    const params = {
      TableName: tableName,
      Key: {
        id: id
      },
    };

    data = await docClient.get(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: data,
      }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: err,
      }),
    };
  }
};
