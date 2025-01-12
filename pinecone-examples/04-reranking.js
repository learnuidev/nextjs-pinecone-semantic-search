const { Pinecone } = require("@pinecone-database/pinecone");
const { pc } = require("./00-pc");

const model = "multilingual-e5-large";
const indexName = "apple";
const index = pc.Index(indexName);

// Define your query
// const queryStr = "Tell me about the tech company known as Apple.";
// const queryStr = "What is company Apple known for?";
const queryStr = "What is Huawei?";
const rerankingModel = "bge-reranker-v2-m3";

// Convert the query into a numerical vector that Pinecone can search with
pc.inference
  .embed(model, [queryStr], {
    inputType: "query",
  })
  .then(async (queryEmbedding) => {
    // Search the index for the three most similar vectors
    const queryResponse = await index.namespace("apple-inc").query({
      topK: 3,
      vector: queryEmbedding[0].values,
      includeValues: false,
      includeMetadata: true,
    });

    const docs = queryResponse.matches.map((val) => ({
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

    const rerankingResp = await pc.inference.rerank(
      rerankingModel,
      queryStr,
      docs,
      rerankOptions
    );

    console.log(JSON.stringify(queryResponse, null, 4));

    console.log("reranking resp", JSON.stringify(rerankingResp, null, 4));
  });
