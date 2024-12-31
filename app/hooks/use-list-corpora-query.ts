import { IndexList } from "@pinecone-database/pinecone";
import { useQuery } from "@tanstack/react-query";

export const listCorpora = async () => {
  const res = await fetch("/api/list-corpora", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const resp = await res.json();
  return resp as any;
};

export const useListCorporaQuery = () => {
  return useQuery<IndexList, Error>({
    queryKey: ["list-corpora"],
    queryFn: async () => {
      const response = await listCorpora();
      return response;
    },
    retry: false,
  });
};
