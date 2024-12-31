import { describeIndex } from "@/lib/pinecone/describe-index";

export async function POST(req: Request) {
  const { name } = await req.json();

  const corpus = await describeIndex(name);

  return Response.json(corpus);
}
