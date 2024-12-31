"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAddResourceMutation } from "@/domain/resource/resource.mutations";
import { AddResourceParams } from "@/domain/resource/resource.types";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import {
  useListSearchResultsMutation,
  useListSearchResultsQuery,
} from "@/domain/search/search.queries";
import { useRouter, useSearchParams } from "next/navigation";

import { useChat } from "ai/react";
import Link from "next/link";
import { useCorpusParams } from "../hooks/use-corpus-params";

export function ResourceForm() {
  const { corpusName } = useCorpusParams();
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
            userId: "learnuidev@gmail.com",
            corpusName,
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
  const [revealSource, setRevealSource] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();

  const { corpusName } = useCorpusParams();

  const [sources, setSources] = useState<any>({});
  const [responses, setResponses] = useState({});

  const { messages, input, handleInputChange, setMessages, handleSubmit } =
    useChat({
      api: "/api/stream-search",

      onFinish: (msg: any) => {
        console.log("DONE", JSON.stringify(msg));

        debouncedAlert(msg);
      },
    });

  const debouncedAlert = useDebouncedCallback(
    // function
    (msg) => {
      console.log("MESSAGES", messages);
      console.log("MSG", msg);

      const answerIndex = messages?.findIndex(
        (message) => message?.id === msg?.id
      );

      console.log("AI", answerIndex);

      const questionIndex = answerIndex - 1;

      const source = sources?.[questionIndex];

      setResponses({
        question: messages?.[questionIndex],
        answer: msg,
        sources: source,
      });

      // alert(
      //   JSON.stringify(
      //     {
      //       question: messages?.[questionIndex],
      //       answer: msg,
      //       sources: source,
      //     },
      //     null,
      //     4
      //   )
      // );

      // alert(value);
    },
    // delay in ms
    1000
  );

  const searchParams = useSearchParams();
  const query = searchParams.get("query") as string;

  const resetFormHandler = () => {
    setContent("");
  };

  const { data, isLoading } = useListSearchResultsQuery({
    query,
    corpusName,
  });

  const listSearchResultsMutation = useListSearchResultsMutation();

  useEffect(() => {
    setContent(query);
  }, [query]);

  // const { data: videos, isLoading: isVideosLoading } = useListVideosQuery({
  //   query,
  // });

  const userQuestions = messages?.filter((message) => message?.role === "user");

  const lastQuestion = userQuestions?.[userQuestions?.length - 1];

  const answers = messages?.filter((message) => message?.role === "assistant");

  const lastAnswer = answers?.[answers?.length - 1];

  const lastQuestionIndex = messages?.findIndex(
    (msg: any) => msg?.id === lastQuestion?.id
  );

  const questionIndex = messages?.length <= 2 ? 0 : lastQuestionIndex;

  const currentSource = sources?.[questionIndex]?.sources;

  return (
    <div className="my-8">
      <form
        onSubmit={(event) => {
          event.preventDefault();

          // setMessages([]);

          listSearchResultsMutation
            ?.mutateAsync({ query: content, corpusName })
            .then((sourcesResp) => {
              const questionIndex = messages?.length;
              setSources({
                ...sources,
                [questionIndex]: {
                  questionIndex: questionIndex,
                  sources: sourcesResp,
                },
              });

              handleSubmit(event, {
                data: {
                  content,
                  sources: sourcesResp,
                },
              });
            });
        }}
      >
        <Input
          onChange={(event) => {
            setContent(event.target.value);
            handleInputChange(event);
          }}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              router.push(`?query=${content}`);
            }
          }}
          value={input}
          className="my-4 md:w-[600px] focus-visible:ring-0"
        />

        <div></div>

        <Button type="submit" className="mr-2">
          {" "}
          Search
        </Button>
      </form>

      <div>
        <h1 className="text-2xl mt-8 mb-4 font-extralight">
          {content || lastQuestion?.content}
        </h1>
      </div>

      <div className="w-full sm:max-w-4xl mb-8">
        {currentSource?.length > 0 && (
          <h1 onClick={() => [setRevealSource((val) => !val)]}>
            Found: {currentSource?.length}{" "}
            {currentSource?.length === 1 ? "source" : "sources"}{" "}
          </h1>
        )}
      </div>

      <div>
        <p dangerouslySetInnerHTML={{ __html: lastAnswer?.content }} />
      </div>

      {revealSource && (
        <div className="max-w-3xl">
          <code>
            <pre className="truncate">
              {JSON.stringify(currentSource, null, 4)}
            </pre>
          </code>
        </div>
      )}
    </div>
  );
}
