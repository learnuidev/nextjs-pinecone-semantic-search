import { appConfig } from "@/config/app-config";
// import { AddResourceParams, Resource } from "@/domain/resource/resource.types";
// import { getEmbedding } from "@/lib/openai";
// import { searchIndex, searchIndexName } from "@/lib/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { queryPineconeVectorStoreAndQueryLLM } from "./utils";
import { CohereClient } from "cohere-ai";
import * as cohereApi from "@/lib/cohere.api";

const cohereClient = new CohereClient({ token: appConfig.cohereAPIKey });

export async function POST(req: Request) {
  const { query } = await req.json();

  const pinecone = new Pinecone({
    apiKey: appConfig.pineconeAPIKey,
  });

  const pineconeResponse = await queryPineconeVectorStoreAndQueryLLM(
    pinecone,
    "cuzo-embedding-search",
    query
  );

  const docs = pineconeResponse.queryResponse.matches.map((match: any) => {
    // return match.metadata.content;
    return {
      // ...match,
      text: match.metadata.content,
    };
  });

  console.log("DOCS", docs);

  // import { CohereClient } from "cohere-ai";

  // const cohereClient = new CohereClient({ token: appConfig.cohereAPIKey });

  // const reranked = await cohereClient.rerank({
  //   query,
  //   documents: docs,
  //   topN: 3,
  // });
  const reranked = await cohereApi.rerank({
    query,
    documents: docs,
    topN: 3,
  });

  // pineconeResponse.queryResponse.matches =
  //   pineconeResponse.queryResponse.matches.filter(
  //     (match: { score: number }) => match.score > 0.76
  //   );

  return Response.json({
    original: pineconeResponse,
    cohere: reranked,
  });
}
