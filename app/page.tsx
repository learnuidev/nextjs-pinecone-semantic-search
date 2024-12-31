"use client";

import { Button } from "@/components/ui/button";

import CorporaFilters from "./components/corpora-filters";
import { CorporaList } from "./components/corpora-list";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-4 sm:p-8 md:p-24">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Coze</h1>

        <p>Next Gen Search</p>
      </div>

      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Corpora</h1>
          <Button>Create corpus</Button>
        </div>
        <CorporaFilters />
        <CorporaList />
      </main>
    </main>
  );
}
