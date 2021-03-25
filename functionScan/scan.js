const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
  let data;
  try {
    const page = (!/^[\d]+$/.test(page)) ? event.queryStringParameters.page : 0;
    const tableName = 'Labels';

    const params = {
      TableName: tableName,
      Limit: 50
    };

    data = await docClient.scan(params).promise();
    if (data) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: data,
        }),
      };
    }
    return {
      statusCode: 404,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: err,
      }),
    };
  }
};
