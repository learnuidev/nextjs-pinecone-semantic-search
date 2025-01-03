import { appConfig } from "@/config/app-config";
import { Pinecone } from "@pinecone-database/pinecone";
import { queryPineconeVectorStoreAndQueryLLM } from "./utils";

import * as cohereApi from "@/lib/cohere.api";

export async function POST(req: Request) {
  const { query, corpusName, rerank = true } = await req.json();

  const pinecone = new Pinecone({
    apiKey: appConfig.pineconeAPIKey,
  });

  const pineconeResponse = await queryPineconeVectorStoreAndQueryLLM(
    pinecone,
    corpusName,
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
    topN: 10,
  });

  let rerankedAndSorted = pineconeResponse.queryResponse.matches
    ?.map((match: any, idx: any) => {
      const rankIndex = reranked?.results?.find((r: any) => r?.index === idx);
      return {
        ...match,
        // cohereScore: 100,
        cohereScore: rankIndex?.relevance_score,
      };
    })
    ?.sort((a: any, b: any) => b?.cohereScore - a?.cohereScore);

  if (rerank) {
    rerankedAndSorted = rerankedAndSorted?.filter(
      (result: any) => result?.cohereScore > 0.8
    );

    return Response.json(rerankedAndSorted);
  }

  return Response.json(rerankedAndSorted);
}
