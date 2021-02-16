const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
  try {
    const obj = JSON.parse(event.body);
    const table = 'Labels';
    const { id, labels } = obj;

    if (!/^[\w\-_]+$/.test(id)) {
      throw 'Something goes wrong with the parameter id';
    }

    const paramsGet = {
      TableName: table,
      Key: {
        id: id,
      },
    };
    const dataGet = await docClient.get(paramsGet).promise();
    if (dataGet.Item) {
      return {
        statusCode: 409, // conflict
        body: JSON.stringify({
          message: `Item ${id} already exists`,
        }),
      };
    }

    const paramsPost = {
      TableName: table,
      Item: {
        id: id,
        labels: labels,
      },
    };

    await docClient.put(paramsPost).promise();
    return {
      statusCode: 201,
      // header: `Location: /label/${id}`,
      body: JSON.stringify({
        message: `Item entered successfully: /label/${id}`,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error: ${JSON.stringify(err)}`,
      }),
    };
  }
};
