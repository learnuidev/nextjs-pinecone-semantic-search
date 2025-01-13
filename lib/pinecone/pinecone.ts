import { appConfig } from "@/config/app-config";
import { Pinecone } from "@pinecone-database/pinecone";

export const pinecone = new Pinecone({
  apiKey: appConfig.pineconeAPIKey,
});

// export const multiLingual = "multilingual-e5-large";
