"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { useAddResourceMutation } from "@/domain/resource/resource.mutations";
import { AddResourceParams, Resource } from "@/domain/resource/resource.types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useListSearchResultsQuery } from "@/domain/search/search.queries";
import { useListVideosQuery } from "./api/list-videos/query";

export function ResourceForm() {
  const [type, setType] = useState("video");
  const [content, setContent] = useState("");

  const addResourceMutation = useAddResourceMutation();

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

      <Input
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
            userId: "learnuidev@gmail.com",
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
export function SearchForm() {
  const [content, setContent] = useState("");
  const router = useRouter();

  const searchParams = useSearchParams();
  const query = searchParams.get("query") as string;

  const resetFormHandler = () => {
    setContent("");
  };

  const { data, isLoading } = useListSearchResultsQuery({
    query,
  });

  useEffect(() => {
    setContent(query);
  }, [query]);

  // const { data: videos, isLoading: isVideosLoading } = useListVideosQuery({
  //   query,
  // });
  return (
    <div className="my-8">
      <Input
        onChange={(event) => {
          setContent(event.target.value);
        }}
        onKeyDown={(event) => {
          console.log("EVENt CODE", event.code);
          if (event.code === "Enter") {
            router.push(`?query=${content}`);
          }
        }}
        value={content}
        className="my-4 md:w-[600px] focus-visible:ring-0"
      />

      <div></div>

      <Button
        onClick={() => {
          router.push(`?query=${content}`);
        }}
        className="mr-2"
      >
        {" "}
        Search
      </Button>
      <Button onClick={resetFormHandler}>Clear</Button>

      {isLoading ? (
        <p className="my-16 text-xl font-light text-center">Loading</p>
      ) : (
        <code className="block my-8">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </code>
      )}
      {/* {isVideosLoading ? (
        <p className="my-16 text-xl font-light text-center">Loading</p>
      ) : (
        <code className="block my-8">
          <pre>{JSON.stringify(videos, null, 2)}</pre>
        </code>
      )} */}
    </div>
  );
}
