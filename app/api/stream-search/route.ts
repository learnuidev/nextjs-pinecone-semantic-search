import { appConfig } from "@/config/app-config";
import { Pinecone } from "@pinecone-database/pinecone";
import { queryPineconeVectorStoreAndQueryLLM } from "./utils";
// import { streamText } from 'ai';
import { StreamingTextResponse, OpenAIStream } from "ai";

import OpenAI from "openai";

import * as cohereApi from "@/lib/cohere.api";
import { searchIndexName } from "@/lib/pinecone";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, context, ...rest } = await req.json();

  console.log("REST", rest);

  const query = rest?.data?.content;
  const sources = rest?.data?.sources;

  // const pinecone = new Pinecone({
  //   apiKey: appConfig.pineconeAPIKey,
  // });

  // const pineconeResponse = await queryPineconeVectorStoreAndQueryLLM(
  //   pinecone,
  //   searchIndexName,
  //   query
  // );

  // const docs = pineconeResponse.queryResponse.matches.map(
  //   (match: any, idx: number) => {
  //     return {
  //       ...match,
  //       text: match.metadata.content,
  //     };
  //   }
  // );

  // const reranked = await cohereApi.rerank({
  //   query,
  //   documents: docs,
  //   topN: 3,
  // });

  // const rerankedAndSorted = pineconeResponse.queryResponse.matches
  //   ?.map((match: any, idx: any) => {
  //     const rankIndex = reranked?.results?.find((r: any) => r?.index === idx);
  //     return {
  //       ...match,
  //       // cohereScore: 100,
  //       cohereScore: rankIndex?.relevance_score,
  //     };
  //   })
  //   ?.sort((a: any, b: any) => b?.cohereScore - a?.cohereScore)
  //   ?.filter((result: any) => result?.cohereScore > 0.8);

  // return Response.json(rerankedAndSorted);

  const prompt = `
INITIAL_QUERY: Here are some sources. Read these carefully, as you will be asked a Query about them.

# General Instructions

Write an accurate, detailed, and comprehensive response to the user's query located at INITIAL_QUERY. Additional context is provided as "USER_INPUT" after specific questions. Your answer should be informed by the provided "Search results". Your answer must be precise, of high-quality, and written by an expert using an unbiased and journalistic tone. Your answer must be written in the same language as the query, even if language preference is different.

You MUST cite the most relevant search results that answer the query. Do not mention any irrelevant results. You MUST ADHERE to the following instructions for citing search results:
- to cite a search result, enclose its index located above the summary with brackets at the end of the corresponding sentence, for example "Ice is less dense than water[1][2]." or "Paris is the capital of France[1][4][5]."
- NO SPACE between the last word and the citation, and ALWAYS use brackets. Only use this format to cite search results. NEVER include a References section at the end of your answer.
- If you don't know the answer or the premise is incorrect, explain why.
If the search results are empty or unhelpful, answer the query as well as you can with existing knowledge.


If you dont know the answer OR if it is not mentioned in the sources, just say that you dont know. Dont make up nonsense.

For example if the user asks random questions like: How to win in life or how to learn hindi something similar but the provided sources is an empty [] then say: I dont know the answer.

Please keep it grounded and only based on the 


##Source Provided:

${JSON.stringify(sources?.length === 0 ? "No source provided. Please answer I dont know" : sources)}




  
  `;

  let firstMessage = {
    role: "system",
    content: prompt,
  };

  console.log("MESSAGES", messages);

  const lastMessage = messages?.[messages?.length - 1];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [firstMessage, lastMessage],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}