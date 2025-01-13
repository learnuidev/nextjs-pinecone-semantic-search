import { appConfig } from "@/config/app-config";
import { Pinecone } from "@pinecone-database/pinecone";

import { querySearch } from "@/lib/pinecone/query-search";

const rerankingModel = "bge-reranker-v2-m3";

export async function POST(req: Request) {
  const {
    query,
    corpusName,
    rerank = true,
    nameSpace,
    model,
  } = await req.json();

  const pinecone = new Pinecone({
    apiKey: appConfig.pineconeAPIKey,
  });

  const pineconeResponse = await querySearch({
    model,
    query,
    corpusName,
    nameSpace,
  });

  const docs = pineconeResponse.matches.map((val: any) => ({
    id: val.id,
    originalScore: val.score,
    text: val.metadata.text,
  }));

  const rerankOptions = {
    topN: 4,
    returnDocuments: true,
    parameters: {
      truncate: "END",
    },
  };

  let reranked = await pinecone.inference.rerank(
    rerankingModel,
    query,
    docs,
    rerankOptions
  );

  let rerankedAndSorted = reranked.data
    .map((match) => {
      return {
        ...match,
      };
    })
    ?.sort((a: any, b: any) => b?.score - a?.score);

  // if (rerank) {
  //   rerankedAndSorted = rerankedAndSorted?.filter(
  //     (result: any) => result?.score > 0.8
  //   );

  //   return Response.json(rerankedAndSorted);
  // }

  return Response.json(rerankedAndSorted);
}
