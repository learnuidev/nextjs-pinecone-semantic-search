import { pinecone } from "./pinecone";

export async function listIndexes() {
  const indexes = await pinecone.listIndexes();

  return indexes;
}
