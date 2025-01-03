import { appConfig } from "@/config/app-config";
import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: appConfig.openAIAPIKey });

export async function createEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  const embedding = response.data[0].embedding;
  return embedding;
}
