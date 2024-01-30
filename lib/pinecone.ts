import { appConfig } from "@/config/app-config";
import { Pinecone } from "@pinecone-database/pinecone";

const pinecone = new Pinecone({
  apiKey: appConfig.pineconeAPIKey,
});

export const searchIndexName = "cuzo-embedding-search";

export const searchIndex = pinecone.Index(searchIndexName);
