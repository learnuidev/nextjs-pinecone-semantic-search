import { appConfig } from "@/config/app-config";
import { Pinecone } from "@pinecone-database/pinecone";
import { queryPineconeVectorStoreAndQueryLLM } from "./utils";

import * as cohereApi from "@/lib/cohere.api";
import { searchIndexName } from "@/lib/pinecone";

export async function POST(req: Request) {
  const { query } = await req.json();

  const pinecone = new Pinecone({
    apiKey: appConfig.pineconeAPIKey,
  });

  const pineconeResponse = await queryPineconeVectorStoreAndQueryLLM(
    pinecone,
    searchIndexName,
    query
  );

  const docs = pineconeResponse.queryResponse.matches.map(
    (match: any, idx: number) => {
      return {
        ...match,
        text: match.metadata.content,
      };
    }
  );

  const reranked = await cohereApi.rerank({
    query,
    documents: docs,
    topN: 3,
  });

  const rerankedAndSorted = pineconeResponse.queryResponse.matches
    ?.map((match: any, idx: any) => {
      const rankIndex = reranked?.results?.find((r: any) => r?.index === idx);
      return {
        ...match,
        // cohereScore: 100,
        cohereScore: rankIndex?.relevance_score,
      };
    })
    ?.sort((a: any, b: any) => b?.cohereScore - a?.cohereScore)
    ?.filter((result: any) => result?.cohereScore > 0.8);

  return Response.json(rerankedAndSorted);
}
