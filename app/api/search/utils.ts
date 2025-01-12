import { createEmbedding } from "@/lib/openai/create-embedding";

export const queryPineconeVectorStoreAndQueryLLM = async (
  client: any,
  indexName: string,
  question: string
) => {
  // 1. Start query process
  console.log(`Querying Pinecone vector store: ${question}`);
  // 2. Retrieve the Pinecone index
  const index = client.Index(indexName);
  // // 3. Create query embedding

  const queryEmbedding = await createEmbedding(question);
  // 4. Query Pinecone index and return top 10 matches
  let queryResponse = await index.query({
    topK: 3,
    vector: queryEmbedding,
    includeMetadata: true,
    // includeValues: true,
  });

  return {
    queryResponse,
    data: "test",
  };
};
