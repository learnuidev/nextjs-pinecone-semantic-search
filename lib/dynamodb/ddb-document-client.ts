import { appConfig } from "@/config/app-config";
import AWS from "aws-sdk";

AWS.config.update({
  region: "us-west-1",
  accessKeyId: appConfig.accessKeyId,
  secretAccessKey: appConfig.awsSecretKey,
});

export const ddbDocumentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  region: "us-east-1",
});
