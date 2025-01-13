import { z } from "zod";

const configSchema = z.object({
  pineconeAPIKey: z.string(),
  deepseekAPIKey: z.string(),
});

export interface IAppConfig {
  pineconeAPIKey: string;
  deepseekAPIKey: string;
}

export const appConfig: IAppConfig = {
  pineconeAPIKey: process.env.PINECONE_API_KEY || "",
  deepseekAPIKey: process.env.DEEPSEEK_API_KEY || "",
};

configSchema.parse(appConfig);
