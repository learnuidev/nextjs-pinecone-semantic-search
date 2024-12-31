import { OpenAIEmbeddings } from "langchain/embeddings/openai";

import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain } from "langchain/chains";
import { Document } from "langchain/document";
import { getEmbedding } from "@/lib/openai";
import { appConfig } from "@/config/app-config";

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

  const queryEmbedding = await getEmbedding(question);
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

  // return { indexName, question };
  // 5. Log the number of matches
  console.log(`Found ${queryResponse.matches.length} matches...`);
  // 6. Log the question being asked
  console.log(`Asking question: ${question}...`);
  if (queryResponse.matches.length) {
    // 7. Create an OpenAI instance and load the QAStuffChain
    const llm = new OpenAI({});
    const chain = loadQAStuffChain(llm);
    // 8. Extract and concatenate page content from matched documents
    const concatenatedPageContent = queryResponse.matches
      .map((match: any) => match.metadata.pageContent)
      .join(" ");
    // 9. Execute the chain with input documents and question
    const result = await chain.call({
      input_documents: [new Document({ pageContent: concatenatedPageContent })],
      question: question,
    });
    // 10. Log the answer
    console.log(`Answer: ${result.text}`);
    return result.text;
  } else {
    // 11. Log that there are no matches, so GPT-3 will not be queried
    console.log("Since there are no matches, GPT-3 will not be queried.");
  }
};
