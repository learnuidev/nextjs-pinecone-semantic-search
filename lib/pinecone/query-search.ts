import { pinecone } from "./pinecone";

export const querySearch = ({
  model,
  query,
  corpusName,
  nameSpace,
}: {
  model: string;
  query: string;
  nameSpace: string;
  corpusName: string;
}) => {
  const queryArr = [query];

  const index = pinecone.Index(corpusName);

  return pinecone.inference
    .embed(model, queryArr, {
      inputType: "query",
    })
    .then(async (queryEmbedding: any) => {
      // Search the index for the three most similar vectors
      const queryResponse = await index.namespace(nameSpace).query({
        topK: 3,
        vector: queryEmbedding[0].values,
        includeValues: false,
        includeMetadata: true,
      });

      return queryResponse;

      console.log(JSON.stringify(queryResponse, null, 4));
    });
};
