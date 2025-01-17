import { appConfig } from "@/config/app-config";
import { Pinecone } from "@pinecone-database/pinecone";

export const pinecone = new Pinecone({
  apiKey: appConfig.pineconeAPIKey,
});
