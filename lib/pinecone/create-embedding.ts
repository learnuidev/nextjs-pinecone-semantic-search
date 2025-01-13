import { pinecone } from "./pinecone";

export const createEmbedding = ({
  content,
  model,
}: {
  model: string;
  content: {
    id: string;
    text: string;
  };
}) => {
  return pinecone.inference
    .embed(model, [content.text], { inputType: "passage", truncate: "END" })
    .then(async (embeddings) => {
      return embeddings[0].values;
      // const records = [content].map((d, i) => ({
      //   id: d.id,
      //   values: embeddings[i].values,
      //   metadata: { text: d.text },
      // })) as any;

      // // Upsert the vectors into the index
      // await index.namespace(nameSpace).upsert(records);

      // // console.log(JSON.stringify(embeddings, null, 4));
      // return embeddings;
    });
};
