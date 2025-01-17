"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useDebouncedCallback } from "use-debounce";

import { useAddResourceMutation } from "@/domain/resource/resource.mutations";
import { useListSearchResultsMutation } from "@/domain/search/search.queries";
import { useRouter, useSearchParams } from "next/navigation";

import { AddResourceParams } from "@/domain/resource/resource.types";
import { searchResultsIndex } from "@/lib/search-results-index";
import { useChat } from "ai/react";
import { useCorpusParams } from "../../hooks/use-corpus-params";
import { getModelName } from "./get-model-name";
import { randomUUID } from "crypto";
import { useGetEmail } from "@/app/hooks/use-get-email";

import React from "react";
import { AnimatedLoadingText } from "@/components/animated-loading-text";

export function SearchForm({ corpus }: { corpus: { dimension: number } }) {
  const [revealSource, setRevealSource] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();
  const { corpusName } = useCorpusParams();
  const emailAddress = useGetEmail();

  const addResourceMutation = useAddResourceMutation();

  const [sources, setSources] = useState<any>({});
  const [responses, setResponses] = useState({});

  const { messages, input, handleInputChange, setMessages, handleSubmit } =
    useChat({
      api: "/api/stream-search",

      onFinish: (msg: any) => {
        debouncedAlert(msg);
      },
    });

  const modelName = getModelName(corpus) as any;

  const debouncedAlert = useDebouncedCallback(
    // function
    (answerResponse) => {
      const answerIndex = messages?.findIndex(
        (message) => message?.id === answerResponse?.id
      );

      const questionIndex = answerIndex - 1;

      const _sources = sources?.[questionIndex]?.sources;

      const content = {
        question: messages?.[questionIndex],
        answer: answerResponse,
        // source: _sources,
        sourceIds: _sources?.map((source: any) => source?.id),
        corpusName: corpusName,
      };

      const contentStr = JSON.stringify(content);

      const inputData = {
        id: crypto.randomUUID(),
        content: contentStr,
        type: "search-result",
        userId: emailAddress,
        nameSpace: `${emailAddress}_search-result`,
        corpusName: searchResultsIndex,
        model: modelName,
        createdAt: Date.now(),
      } as AddResourceParams;

      if (!answerResponse?.content?.toLowerCase()?.includes("i don't know")) {
        console.log("captured", content);
        addResourceMutation.mutateAsync(inputData).then((resp) => {
          setResponses(content);
        });
      }
    },
    // delay in ms
    1000
  );

  const searchParams = useSearchParams();
  const query = searchParams.get("query") as string;

  const listSearchResultsMutation = useListSearchResultsMutation();

  useEffect(() => {
    setContent(query);
  }, [query]);

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

          listSearchResultsMutation
            ?.mutateAsync({
              query: content,
              corpusName,
              model: modelName,
              nameSpace: emailAddress,
            })
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
        className="flex space-x-4"
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
          placeholder="Ask me anything..."
          value={input}
          className="md:w-[600px] focus-visible:ring-0 rounded-full"
        />

        <Button type="submit" variant={"outline"} className="rounded-full">
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
        {listSearchResultsMutation?.isPending ? (
          <AnimatedLoadingText
            className="text-md"
            message="loading sources..."
          />
        ) : (
          currentSource?.length > 0 && (
            <h1
              onClick={() => [setRevealSource((val) => !val)]}
              className="text-md"
            >
              Found: {currentSource?.length}{" "}
              {currentSource?.length === 1 ? "source" : "sources"}{" "}
            </h1>
          )
        )}
      </div>

      <Markdown>{lastAnswer?.content}</Markdown>

      {revealSource && (
        <div className="max-w-3xl">
          <code>
            <pre className="">{JSON.stringify(currentSource, null, 4)}</pre>
          </code>
        </div>
      )}
    </div>
  );
}
