import { appConfig } from "@/config/app-config";

const COHERE_API_URL = `https://api.cohere.ai`;

interface CohereRerankParams {
  query: string;
  documents: string[] | { text: string }[];
  topN?: number;
}

export const rerank = async (params: CohereRerankParams) => {
  const { query, documents, topN = 3 } = params;

  const bodyParams = {
    model: "rerank-english-v2.0",
    top_n: topN,
    query,
    documents: documents,
  };

  console.log("API KEY", appConfig.cohereAPIKey);
  const response = await fetch(`${COHERE_API_URL}/v1/rerank`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${appConfig.cohereAPIKey}`,
    },
    body: JSON.stringify(bodyParams),
  });

  const resp = await response.json();

  return resp;
};
