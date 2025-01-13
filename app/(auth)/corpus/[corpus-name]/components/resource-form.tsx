"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAddResourceMutation } from "@/domain/resource/resource.mutations";
import { AddResourceParams } from "@/domain/resource/resource.types";
import { useState } from "react";

import { useCorpusParams } from "../../hooks/use-corpus-params";

function getModelName({ dimension }: { dimension: number }) {
  if (dimension === 1024) {
    return "multilingual-e5-large";
  }

  return 1536;
}

export function ResourceForm({ corpus }: { corpus: { dimension: number } }) {
  const { corpusName } = useCorpusParams();
  const [type, setType] = useState("video");
  const [content, setContent] = useState("");

  const addResourceMutation = useAddResourceMutation();

  console.log("CORPUS", corpus);

  const resetFormHandler = () => {
    setContent("");
  };
  return (
    <div className="my-8">
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

      <textarea
        onChange={(event) => {
          setContent(event.target.value);
        }}
        value={content}
        className="my-4 md:w-[600px] focus-visible:ring-0"
      />

      <Button
        onClick={() => {
          const inputData = {
            type,
            content,
            corpusName,
            model: getModelName(corpus),
            nameSpace: "learnuidev@gmail.com",
          } as AddResourceParams;
          addResourceMutation.mutateAsync(inputData).then((res) => {
            // alert(JSON.stringify(res));
            resetFormHandler();
          });
        }}
        className="mr-2"
      >
        {" "}
        Add Resource
      </Button>
      <Button onClick={resetFormHandler}>Clear</Button>
    </div>
  );
}
