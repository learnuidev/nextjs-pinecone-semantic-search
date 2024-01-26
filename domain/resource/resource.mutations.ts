"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AddResourceParams, Resource } from "./resource.types";
import { addResource } from "./resource.api";

export function useAddResourceMutation(options = {} as any) {
  return useMutation({
    mutationFn: async (params: AddResourceParams) => {
      const response = await addResource(params);
      return response;
    },

    onSuccess: (data) => {
      console.log("SUCCESS", data);
    },
  });
}
