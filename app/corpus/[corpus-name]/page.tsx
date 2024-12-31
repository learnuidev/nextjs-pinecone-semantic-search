"use client";

import { Suspense } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceForm, SearchForm } from "./resource-form";
import { useCorpusParams } from "../hooks/use-corpus-params";
import { useDescribeCorpusQuery } from "../hooks/use-describe-corpus-query";

import { Copy, MoreVertical, XIcon } from "lucide-react";
import Link from "next/link";

export default function CorpusItem() {
  const { corpusName } = useCorpusParams();

  const {
    data: corpus,
    isError,
    isLoading,
  } = useDescribeCorpusQuery(corpusName);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-2xl font-bold">...</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen flex-col items-center p-24">
        <h1 className="text-2xl font-bold">Oops. Something Went Wrong</h1>
        <p>Looks like this corpus doesnt exist</p>
      </div>
    );
  }
  return (
    <main className="flex min-h-screen flex-col p-24">
      <div className="flex justify-between items-center w-full">
        <div>
          <h1 className="text-2xl font-bold">Coze</h1>

          <p>Next Gen Search</p>
        </div>

        <Link href="/">
          <XIcon />
        </Link>
      </div>

      <section>
        <h1 className="my-4 text-2xl">{corpusName}</h1>
        {/* <code>
          <pre>{JSON.stringify(corpus, null, 4)}</pre>
        </code> */}
      </section>
      <Suspense>
        <Tabs defaultValue="search" className="">
          <TabsList>
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
          </TabsList>
          <TabsContent value="form">
            <ResourceForm />
          </TabsContent>
          <TabsContent value="search">
            <SearchForm />
          </TabsContent>
        </Tabs>
      </Suspense>
    </main>
  );
}
