var AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-1' });
var credentials = new AWS.SharedIniFileCredentials({ profile: 'cnt000' });

AWS.config.credentials = credentials;

var docClient = new AWS.DynamoDB.DocumentClient();

var table = 'Movies';

var year = 2015;
var title = 'The Big New Movie';

var params = {
  TableName: table,
  Item: {
    year: year,
    title: title,
    info: {
      plot: 'Nothing happens at all.',
      rating: 0,
    },
  },
};

console.log('Adding a new item...');
docClient.put(params, function (err, data) {
  if (err) {
    console.error(
      'Unable to add item. Error JSON:',
      JSON.stringify(err, null, 2),
    );
  } else {
    console.log('Added item:', JSON.stringify(data, null, 2));
  }
});
