const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
  try {
    const obj = JSON.parse(event.body);
    const table = 'Labels';
    const { id, labels } = obj;

    const params = {
      TableName: table,
      Item: {
        id: id,
        labels: labels,
      },
    };

    const result = await docClient.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Item entered successfully: ${JSON.stringify(params)} (${result})`,
      }),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Item entered successfully: ${JSON.stringify(err)}`,
      }),
    };
  }
};
