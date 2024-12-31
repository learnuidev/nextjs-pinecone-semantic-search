import { describeIndex } from "@/lib/pinecone/get-index";

export async function POST(req: Request) {
  const { name } = await req.json();

  const corpus = await describeIndex(name);

  return Response.json(corpus);
}
