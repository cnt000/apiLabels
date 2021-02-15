const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
  let data;
  try {
    const id = event.queryStringParameters.id;
    const tableName = 'Labels';

    if(!id) {
      return {
        statusCode: 405
      };
    }

    if (!/^[\w\-_]+$/.test(id)) {
      throw 'Something goes wrong with the parameter id';
    }

    const params = {
      TableName: tableName,
      Key: {
        id: id,
      },
    };

    data = await docClient.delete(params).promise();
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
