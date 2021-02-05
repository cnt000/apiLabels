const { db } = require('./lib');

exports.handler = async (event) => {
  try {
    const obj = JSON.parse(event.body);
    const table = 'Labels';
    const { id, name, labels } = obj;

    const params = {
      TableName: table,
      Item: {
        id: id,
        name: name,
        labels: labels,
      },
    };

    console.log(
      `Adding a item in ${table}, name: ${name}, labels: ${JSON.stringify(
        labels,
      )}`,
    );

    const result = await db.insert(params);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Item entered successfully: ${JSON.stringify(result)}`,
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
