"use client";

import { useQuery } from "@tanstack/react-query";
import { ListVideosParams } from "./types";

export const queryId = "youtube/list-videos";
export function useListVideosQuery(
  params = {} as ListVideosParams,
  options = {} as any
) {
  return useQuery({
    queryKey: [queryId, params.query],
    queryFn: async () => {
      const res = await fetch("/api/list-videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const resp = await res.json();
      return resp as any;
    },
    enabled: Boolean(params.query),
  });
}
