"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAddResourceMutation } from "@/domain/resource/resource.mutations";
import { AddResourceParams } from "@/domain/resource/resource.types";
import { useState } from "react";

import { useCorpusParams } from "../../hooks/use-corpus-params";
import { useGetEmail } from "@/app/hooks/use-get-email";
import { models } from "@/lib/pinecone/models";

function getModelName({ dimension }: { dimension: number }) {
  if (dimension === models.e5Large.dimension) {
    return models.e5Large.embeddingModel;
  }

  return models.ada2.embeddingModel;
}

export function ResourceForm({ corpus }: { corpus: { dimension: number } }) {
  const { corpusName } = useCorpusParams();
  const [type, setType] = useState("video");
  const [content, setContent] = useState("");

  const emailAddress = useGetEmail();

  const addResourceMutation = useAddResourceMutation();

  const resetFormHandler = () => {
    setContent("");
  };
  return (
    <div className="my-8 max-w-6xl mx-auto">
      <RadioGroup
        defaultValue={type}
        onValueChange={(value: string) => {
          setType(value);
        }}
        className="flex space-x-4 justify-center items-center"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="video" id="r1" />
          <Label htmlFor="r1">Video</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="audio" id="r3" />
          <Label htmlFor="r3">Audio</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="website" id="r3" />
          <Label htmlFor="r3">Website</Label>
        </div>
      </RadioGroup>

      <div className="my-8 max-w-6xl mx-auto flex justify-between items-center">
        <textarea
          onChange={(event) => {
            setContent(event.target.value);
          }}
          value={content}
          className="p-4 max-w-8xl w-full h-[260px] sm:h-[600px] rounded-xl focus-visible:outline-none focus-visible:ring-ring dark:bg-black bg-gray-100"
        />
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        <Button
          className="dark:bg-gray-800 dark:text-white"
          onClick={() => {
            const inputData = {
              type,
              content,
              corpusName,
              model: getModelName(corpus),
              nameSpace: emailAddress,
            } as AddResourceParams;
            addResourceMutation.mutateAsync(inputData).then((res) => {
              // alert(JSON.stringify(res));
              resetFormHandler();
            });
          }}
        >
          {" "}
          Add Resource
        </Button>
        <Button
          className="dark:bg-gray-800 dark:text-white"
          onClick={resetFormHandler}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
