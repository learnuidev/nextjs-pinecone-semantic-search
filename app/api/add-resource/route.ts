import { AddResourceParams, Resource } from "@/domain/resource/resource.types";
import { createEmbedding } from "@/lib/pinecone/create-embedding";

import crypto from "crypto";

import { pineconeIndex } from "@/lib/pinecone/pinecone-index";

export async function POST(req: Request) {
  const { type, content, model, corpusName, nameSpace } =
    (await req.json()) as AddResourceParams;

  const embeddingText = `
  Type: ${type}\n\n
  Content: ${content}
  `;

  const newContent = {
    text: embeddingText,
    id: crypto.randomUUID(),
  };

  // Save it to pine cone
  const embedding = await createEmbedding({
    model,
    content: newContent,
  });

  const records = [newContent].map((d, i) => ({
    id: d.id,
    values: embedding,
    metadata: { text: d.text },
  })) as any;

  const index = pineconeIndex(corpusName);

  await index.namespace(nameSpace).upsert(records);

  return Response.json({
    type,
    content,
    embedding,
  });
}
