import { AddResourceParams, Resource } from "@/domain/resource/resource.types";
import { getEmbedding } from "@/lib/openai";
import { searchIndex } from "@/lib/pinecone";

type ResponseData = {
  message: string;
};

export async function POST(req: Request) {
  const { type, content, userId } = (await req.json()) as AddResourceParams;

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

  await searchIndex.upsert([
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
