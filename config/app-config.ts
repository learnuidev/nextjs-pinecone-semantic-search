export interface IAppConfig {
  openAIApiKey: string;
  pineconeApiKey: string;
}

export const appConfig = {
  openAIApiKey: process.env.OPENAI_API_KEY,
  pineconeApiKey: process.env.PINECONE_API_KEY,
} as IAppConfig;
