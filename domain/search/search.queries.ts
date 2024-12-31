"use client";
import { queryIds } from "./queryIds";

import { useQuery } from "@tanstack/react-query";
import { listRearchResults } from "./search.api";

export function useListSearchResultsQuery(
  params = {} as { query: string },
  options = {} as any
) {
  return useQuery({
    queryKey: [queryIds.search, params.query],
    queryFn: async () => {
      const response = await listRearchResults(params);
      return response;
    },
    enabled: Boolean(params.query),
    retry: false,
  });
}
