import { pinecone } from "./pinecone";

export const createEmbedding = ({
  content,
  model,
}: {
  model: string;
  content: string;
}) => {
  return pinecone.inference
    .embed(model, [content], { inputType: "passage", truncate: "END" })
    .then(async (embeddings) => {
      return embeddings[0].values;
    });
};
