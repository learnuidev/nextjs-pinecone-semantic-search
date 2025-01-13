import { createIndex } from "@/lib/pinecone/create-index";

export async function POST(req: Request) {
  const { name, dimension } = await req.json();

  const newIndex = await createIndex({ name, dimension });

  return Response.json(newIndex);
}
