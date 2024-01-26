"use client";

import { ListSearchParams } from "./search.types";

export const listRearchResults = async (options: ListSearchParams) => {
  const res = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const resp = await res.json();
  return resp as any;
};
