import { appConfig } from "@/config/app-config";
import { AddResourceParams, Resource } from "@/domain/resource/resource.types";
import { getEmbedding } from "@/lib/openai";
import { searchIndex, searchIndexName } from "@/lib/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { queryPineconeVectorStoreAndQueryLLM } from "./utils";

type ResponseData = {
  message: string;
};

export async function POST(req: Request) {
  const { query } = await req.json();

  const pinecone = new Pinecone({
    apiKey: appConfig.pineconeApiKey,
  });

  const text = await queryPineconeVectorStoreAndQueryLLM(
    pinecone,
    "cuzo-embedding-search",
    query
  );

  text.queryResponse.matches = text.queryResponse.matches.filter(
    (match) => match.score > 0.76
  );

  return Response.json(text);
}
