const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
  let data;
  try {
    const obj = JSON.parse(event.body);

    const { id, name } = obj;

    const params = {
      TableName: 'italian',
      Item: {
        id: { S: id },
        name: { S: name },
      },
    };

    data = await ddb.putItem(params).promise();
    console.log('Item entered successfully:', data);
  } catch (err) {
    console.log(err);
    return err;
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Item entered successfully: ${data}`,
    }),
  };
};
