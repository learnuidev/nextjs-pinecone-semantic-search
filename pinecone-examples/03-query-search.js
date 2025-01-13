const { pc } = require("./00-pc");

const model = "multilingual-e5-large";
const indexName = "apple";
const index = pc.Index(indexName);

// Define your query
const query = ["Tell me about the tech company known as Apple."];

// Convert the query into a numerical vector that Pinecone can search with
pc.inference
  .embed(model, query, {
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

    console.log(JSON.stringify(queryResponse, null, 4));
  });
