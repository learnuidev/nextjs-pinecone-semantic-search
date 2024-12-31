import { listIndexes } from "@/lib/pinecone/list-indexes";

export async function POST(req: Request) {
  const newIndex = await listIndexes();

  return Response.json(newIndex);
}
