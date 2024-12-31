import { pinecone } from "./pinecone/pinecone";

export const searchIndexName = "cuzo-embedding-search";

export const searchIndex = pinecone.Index(searchIndexName);
