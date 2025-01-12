const { Pinecone } = require("@pinecone-database/pinecone");

const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "",
});

async function createEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  const embedding = response.data[0].embedding;
  return embedding;
}

// const query = `Building a Socialism With a Specifically Chinese Character`;
const query = `Who is Deng Xiao Ping`;

const pinecone = new Pinecone({
  apiKey: "",
});

const indexName = "deng-ai";
const index = pinecone.Index(indexName);

const rerankingModel = "bge-reranker-v2-m3";

createEmbedding(query).then(async (embedding) => {
  console.log("embedding", embedding);

  const resp = await index.query({
    topK: 3,
    vector: embedding,
    includeMetadata: true,
    // includeValues: true,
  });
  const docs = resp.matches.map((match, idx) => {
    return {
      ...match,
      text: match.metadata.content,
    };
  });

  const rerankOptions = {
    topN: 4,
    returnDocuments: true,
    parameters: {
      truncate: "END",
    },
  };

  const rerankingResp = await pinecone.inference.rerank(
    rerankingModel,
    query,
    docs,
    rerankOptions
  );

  console.log(JSON.stringify(docs, null, 4));

  console.log(JSON.stringify(rerankingResp, null, 4));
});
