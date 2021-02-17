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
    if (!dataGet.Item) {
      return {
        statusCode: 404, // already exist
        body: JSON.stringify({
          message: `Item ${id} do not exists`,
        }),
      };
    }

    const fields = Object.keys(labels).map((label) => `labels.${label} = :${label}`).join(', ')
    const updateString = `set ${fields}`;
    let updateValues = {};
    Object.keys(labels).forEach(
      (key) => (updateValues[`:${key}`] = labels[key]),
    );

    const paramsUpdate = {
      TableName: table,
      Key: {
        id,
      },
      UpdateExpression: updateString,
      ExpressionAttributeValues: updateValues,
      ReturnValues: 'UPDATED_NEW',
    };

    const data = await docClient.update(paramsUpdate).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Item updated successfully: ${JSON.stringify(data)}`,
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
