"use client";
import { queryIds } from "./queryIds";

import { useMutation, useQuery } from "@tanstack/react-query";
import { listRearchResults } from "./search.api";
import { ListSearchParams } from "./search.types";

export function useListSearchResultsQuery(
  params = {} as ListSearchParams,
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
export function useListSearchResultsMutation(
  params = {} as { query: string },
  options = {} as any
) {
  return useMutation({
    mutationFn: async (params: ListSearchParams) => {
      const response = await listRearchResults(params);
      return response;
    },

    retry: false,
  });
}
