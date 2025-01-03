import { z } from "zod";

const configSchema = z.object({
  openAIAPIKey: z.string(),
  pineconeAPIKey: z.string(),
  youtubeAPIKey: z.string(),
  cohereAPIKey: z.string(),
  deepseekAPIKey: z.string(),
});

export interface IAppConfig {
  openAIAPIKey: string;
  pineconeAPIKey: string;
  youtubeAPIKey: string;
  cohereAPIKey: string;
  deepseekAPIKey: string;
}

export const appConfig: IAppConfig = {
  youtubeAPIKey: process.env.YOUTUBE_API_KEY || "",
  openAIAPIKey: process.env.OPENAI_API_KEY || "",
  pineconeAPIKey: process.env.PINECONE_API_KEY || "",
  cohereAPIKey: process.env.COHERE_API_KEY || "",
  deepseekAPIKey: process.env.DEEPSEEK_API_KEY || "",
};

configSchema.parse(appConfig);
