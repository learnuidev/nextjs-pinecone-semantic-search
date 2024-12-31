// import { pinecone } from "./pinecone/pinecone";

import { pinecone } from "./pinecone";

export const pineconeIndex = (name: string) => pinecone.Index(name);
