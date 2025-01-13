import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useIsAdmin } from "../hooks/use-is-admin";

interface CreateCorpus {
  name: string;
  dimension: number;
  embeddingModel: string;
}

const createCorpus = async (options: CreateCorpus) => {
  const res = await fetch("/api/create-corpus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const resp = await res.json();
  return resp as any;
};

export function useAddCorpusMutation() {
  return useMutation({
    mutationFn: async (params: CreateCorpus) => {
      const response = await createCorpus(params);
      return response;
    },
  });
}

export function CreateCorpusDialog() {
  const [name, setName] = useState("");
  const [dimension, setDimension] = useState({
    dimension: 1024,
    embeddingModel: "multilingual-e5-large",
  });
  const addCorpusMutation = useAddCorpusMutation();
  const router = useRouter();

  const isAdmin = useIsAdmin();

  if (isAdmin) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Corpus</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Corpus</DialogTitle>
          <DialogDescription>Add a new corpus</DialogDescription>
        </DialogHeader>
        <div className="">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              id="name"
              className="col-span-3"
            />
          </div>
        </div>
        <div className="space-x-3">
          <div className="flex flex-col gap-4">
            <Label htmlFor="dimension" className="text-left">
              Configuration
            </Label>
            <div className="flex space-x-4">
              <button
                className={dimension.dimension === 1024 ? "text-rose-400" : ""}
                onClick={() => {
                  setDimension({
                    dimension: 1024,
                    embeddingModel: "multilingual-e5-large",
                  });
                }}
              >
                multilingual-e5-large
              </button>
              <button
                className={dimension.dimension === 1536 ? "text-rose-400" : ""}
                onClick={() => {
                  setDimension({
                    dimension: 1536,
                    embeddingModel: "text-embedding-ada-2",
                  });
                }}
              >
                text-embedding-ada-2
              </button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              addCorpusMutation
                .mutateAsync({ name, ...dimension })
                .then((resp) => {
                  router.push(`/corpus/${name}`);
                });
            }}
          >
            {addCorpusMutation.isPending ? "Creating..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
