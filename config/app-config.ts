import { z } from "zod";

const configSchema = z.object({
  openAIAPIKey: z.string(),
  pineconeAPIKey: z.string(),
  youtubeAPIKey: z.string(),
  cohereAPIKey: z.string(),
  deepseekAPIKey: z.string(),
  accessKeyId: z.string(),
  awsSecretKey: z.string(),
});

export interface IAppConfig {
  openAIAPIKey: string;
  pineconeAPIKey: string;
  youtubeAPIKey: string;
  cohereAPIKey: string;
  deepseekAPIKey: string;
  accessKeyId: string;
  awsSecretKey: string;
}

export const appConfig: IAppConfig = {
  youtubeAPIKey: process.env.YOUTUBE_API_KEY || "",
  openAIAPIKey: process.env.OPENAI_API_KEY || "",
  pineconeAPIKey: process.env.PINECONE_API_KEY || "",
  cohereAPIKey: process.env.COHERE_API_KEY || "",
  deepseekAPIKey: process.env.DEEPSEEK_API_KEY || "",

  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY || "",
};

configSchema.parse(appConfig);
