import { pinecone } from "./pinecone";

export async function describeIndex(name: string) {
  const index = await pinecone.describeIndex(name);

  return index;
}
