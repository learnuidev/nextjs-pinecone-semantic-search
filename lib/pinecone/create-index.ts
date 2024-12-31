import { pinecone } from "./pinecone";

export async function createIndex({ name }: { name: string }) {
  const newIndex = await pinecone.createIndex({
    name,
    dimension: 1536,
    metric: "cosine",
    spec: {
      serverless: {
        cloud: "aws",
        region: "us-east-1",
      },
    },
  });

  const newIndexSample = {
    id: "40baa6ae-4e86-4f1c-b411-9fe4930e413f",
    vector_type: "dense",
    name: "test-index",
    metric: "cosine",
    dimension: 1536,
    status: {
      ready: false,
      state: "Initializing",
    },
    host: "test-index-nfh6x6t.svc.aped-4627-b74a.pinecone.io",
    spec: {
      serverless: {
        region: "us-east-1",
        cloud: "aws",
      },
    },
    deletion_protection: "disabled",
    tags: {
      embedding_model: "text-embedding-ada-002",
    },
  };

  return newIndex;
}
