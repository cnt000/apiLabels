const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
  let data;
  try {
    const id = event.queryStringParameters.id;
    const tableName = 'Labels';

    if (!/^[\w\-_]+$/.test(id)) {
      throw new Error('Something goes wrong with the parameter');
    }

    const params = {
      TableName: tableName,
      Key: {
        id: id,
      },
    };

    data = await docClient.get(params).promise();
    if (data.Item) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: data.Item,
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
