"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Suspense, useState } from "react";
import { useAddResourceMutation } from "@/domain/resource/resource.mutations";
import { AddResourceParams, Resource } from "@/domain/resource/resource.types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useListSearchResultsQuery } from "@/domain/search/search.queries";
import { ResourceForm, SearchForm } from "./resource-form";

export default function Home() {
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
