"use client";

import Link from "next/link";
import Markdown from "react-markdown";

export function SearchResults({ results }: any) {
  return (
    <div>
      <h1 className="text-center my-8 text-2xl font-extralight">
        Search Results
      </h1>

      <section className="gap-4 flex flex-col">
        {results?.map((result: any) => {
          const searchResult = JSON.parse(result?.document.text);
          return (
            <div
              key={JSON.stringify(result)}
              className="bg-gray-50 dark:bg-black p-8 rounded-2xl"
            >
              <div className="w-full">
                <h1 className="text-3xl mb-8 font-extralight">
                  {searchResult?.question?.content}
                </h1>
              </div>

              <div>
                <Markdown>{searchResult?.answer?.content}</Markdown>
              </div>

              <div className="mt-8 flex justify-between items-center">
                <h3 className="text-2xl font-extralight">
                  Score: {result?.score}
                </h3>

                <Link
                  href={`/corpus/${searchResult?.corpusName}`}
                  className=" bg-gray-200 dark:bg-gray-900 px-4 py-[2px]"
                  target="_blank"
                >
                  {searchResult?.corpusName}
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
