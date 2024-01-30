import { z } from "zod";

const configSchema = z.object({
  openAIAPIKey: z.string(),
  pineconeAPIKey: z.string(),
  youtubeAPIKey: z.string(),
});

export interface IAppConfig {
  openAIAPIKey: string;
  pineconeAPIKey: string;
  youtubeAPIKey: string;
}

export const appConfig = {
  youtubeAPIKey: process.env.YOUTUBE_API_KEY,
  openAIAPIKey: process.env.OPENAI_API_KEY,
  pineconeAPIKey: process.env.PINECONE_API_KEY,
} as IAppConfig;

configSchema.parse(appConfig);
