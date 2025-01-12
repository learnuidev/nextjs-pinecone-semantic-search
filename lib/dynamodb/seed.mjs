import AWS from "aws-sdk";

AWS.config.update({
  region: "us-west-1",
});

async function createTable(tableName) {
  const dynamodDB = new AWS.DynamoDB();
  const params = {
    TableName: tableName, // Replace with your desired table name
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" }, // Partition key
      { AttributeName: "userId", KeyType: "RANGE" }, // Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" }, // String type for id
      { AttributeName: "userId", AttributeType: "S" }, // String type for userId
    ],
    BillingMode: "PAY_PER_REQUEST", // Set billing mode to on-demand
    GlobalSecondaryIndexes: [
      {
        IndexName: "byUserId",
        KeySchema: [
          { AttributeName: "userId", KeyType: "HASH" }, // GSI partition key
          { AttributeName: "id", KeyType: "RANGE" }, // GSI sort key
        ],
        Projection: {
          ProjectionType: "ALL",
        },
      },
    ],
  };

  // Call DynamoDB to create the table
  await dynamodDB.createTable(params).promise();
}

async function seedTables() {
  await createTable("coze-corpora-table");
  await createTable("coze-sources-table");
  await createTable("coze-search-results-table");

  console.log("DONE");
}

// Run this once
// seedTables();
