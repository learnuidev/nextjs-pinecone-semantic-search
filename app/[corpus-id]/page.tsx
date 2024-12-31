"use client";

import { Suspense } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceForm, SearchForm } from "./resource-form";

export default function CorpusItem() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl font-bold">Coze</h1>

      <p>Next Gen Search</p>
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
