"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useDebouncedCallback } from "use-debounce";

import {
  useListSearchResultsMutation,
  useListSearchResultsQuery,
} from "@/domain/search/search.queries";
import { useRouter, useSearchParams } from "next/navigation";
import { useAddResourceMutation } from "@/domain/resource/resource.mutations";

import { useChat } from "ai/react";
import { useCorpusParams } from "../../hooks/use-corpus-params";
import { AddResourceParams } from "@/domain/resource/resource.types";
import { searchResultsIndex } from "@/lib/search-results-index";

export function SearchForm() {
  const [revealSource, setRevealSource] = useState(false);
  const [content, setContent] = useState("");
  const router = useRouter();

  const addResourceMutation = useAddResourceMutation();

  const { corpusName } = useCorpusParams();

  const [sources, setSources] = useState<any>({});
  const [responses, setResponses] = useState({});

  const { messages, input, handleInputChange, setMessages, handleSubmit } =
    useChat({
      api: "/api/stream-search",

      onFinish: (msg: any) => {
        debouncedAlert(msg);
      },
    });

  const debouncedAlert = useDebouncedCallback(
    // function
    (answerResponse) => {
      const answerIndex = messages?.findIndex(
        (message) => message?.id === answerResponse?.id
      );

      const questionIndex = answerIndex - 1;

      const _sources = sources?.[questionIndex]?.sources;

      const response = {};

      const content = {
        question: messages?.[questionIndex],
        answer: answerResponse,
        sourceIds: _sources?.map((source: any) => source?.id),
        corpusName: corpusName,
      };

      const contentStr = JSON.stringify(content);

      const inputData = {
        type: "search-result",
        content: contentStr,
        userId: "learnuidev@gmail.com",
        corpusName: searchResultsIndex,
        createdAt: Date.now(),
      } as AddResourceParams;

      if (!answerResponse?.content?.toLowerCase()?.includes("I don't know")) {
        console.log("captured", content);
        addResourceMutation.mutateAsync(inputData).then((resp) => {
          setResponses(content);
        });
      }

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
        <Markdown>{lastAnswer?.content}</Markdown>
        {/* <p dangerouslySetInnerHTML={{ __html: lastAnswer?.content }} /> */}
      </div>

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
