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

interface CreateCorpus {
  name: string;
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
  const router = useRouter();

  const addCorpusMutation = useAddCorpusMutation();
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
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              addCorpusMutation.mutateAsync({ name }).then((resp) => {
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
