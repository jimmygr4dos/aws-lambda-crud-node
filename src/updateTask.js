const AWS = require('aws-sdk');

const updateTask = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const { title, description, done, createdAt } = JSON.parse(event.body);

  await dynamodb.update({
    TableName: 'TaskTable',
    Key: {id},
    UpdateExpression: 'set done = :done, title = :title, description = :description, createdAt = :createdAt',
    ExpressionAttributeValues: {
      ':done': done,
      ':title': title,
      ':description': description,
      ':createdAt': createdAt
    },
    ReturnValues: 'ALL_NEW'
  }).promise()

  return {
    status: 200,
    body: JSON.stringify({
      message: 'Task updated successfully',
    }),
  };

};

module.exports = {
  updateTask
}