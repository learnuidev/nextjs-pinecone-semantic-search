"use client";
import { AddResourceParams, Resource } from "./resource.types";

export const addResource = async (options: AddResourceParams) => {
  const res = await fetch("/api/add-resource", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const resp = await res.json();
  return resp as any;
};
