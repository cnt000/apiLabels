const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
  let data;
  try {
    const obj = JSON.parse(event.body);

    const { id, tableName = 'italian' } = obj;

    const params = {
      TableName: tableName,
      Key: {
        id: { S: id },
      },
    };

    data = await ddb.getItem(params).promise();
    console.log('Item read successfully:', JSON.stringify(data));
  } catch (err) {
    console.log(err);
    return err;
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: data,
    }),
  };
};
