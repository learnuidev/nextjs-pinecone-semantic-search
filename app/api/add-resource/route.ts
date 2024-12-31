import { AddResourceParams, Resource } from "@/domain/resource/resource.types";
import { getEmbedding } from "@/lib/openai";
import { pineconeIndex } from "@/lib/pinecone/pinecone-index";

export async function POST(req: Request) {
  const { type, content, userId, corpusName } =
    (await req.json()) as AddResourceParams;

  // Save it to pine cone
  const embedding = await getEmbedding(`
  Type: ${type}\n\n
  Content: ${content}
  `);

  //   Save it in DB
  const params = {
    id: crypto.randomUUID(),
    type,
    content,
  };

  const corpusIndex = pineconeIndex(corpusName);

  await corpusIndex.upsert([
    {
      id: params.id,
      values: embedding,
      metadata: {
        type,
        userId,
        content,
      },
    },
  ]);

  return Response.json({
    type,
    content,
    embedding,
  });
}
