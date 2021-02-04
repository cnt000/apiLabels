const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
  let data;
  try {
    const params = {
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'labels',
          AttributeType: 'M',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'labels',
          KeyType: 'RANGE',
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      TableName: 'italian',
      StreamSpecification: {
        StreamEnabled: false,
      },
    };

    ddb.createTable(params, function (err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Table Created', data);
      }
    });

    const obj = JSON.parse(event.body);

    const { id, labels, tableName = 'italian' } = obj;

    const params = {
      TableName: tableName,
      Item: {
        id: { S: id },
        labels: { M: { labels: { prova: 123 } } },
      },
    };

    data = await ddb.putItem(params).promise();
    console.log('Item entered successfully:', JSON.stringify(data));
  } catch (err) {
    console.log(err);
    return err;
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Item entered successfully: ${JSON.stringify(data)}`,
    }),
  };
};
