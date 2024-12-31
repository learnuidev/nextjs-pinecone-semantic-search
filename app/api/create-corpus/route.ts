import { createIndex } from "@/lib/pinecone/create-index";

export async function POST(req: Request) {
  const { name } = await req.json();

  const newIndex = await createIndex({ name });

  return Response.json(newIndex);
}
