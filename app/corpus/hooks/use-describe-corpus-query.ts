import { IndexModel } from "@pinecone-database/pinecone";
import { useQuery } from "@tanstack/react-query";

export const describeCorpus = async (name: string) => {
  const res = await fetch("/api/describe-corpus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name }),
  });

  if (!res?.ok) {
    throw new Error(res?.statusText);
  }
  const resp = await res.json();
  return resp as any;
};

export const useDescribeCorpusQuery = (name: string) => {
  return useQuery<IndexModel, Error>({
    queryKey: ["describe-corpus", name],
    queryFn: async () => {
      const response = await describeCorpus(name);
      return response;
    },
    retry: false,
  });
};
