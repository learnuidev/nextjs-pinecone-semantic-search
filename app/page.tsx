"use client";

import { useState } from "react";
import CorporaFilters from "./components/corpora-filters";
import { CorporaList } from "./components/corpora-list";
import { CreateCorpusDialog } from "./components/create-corpus-dialog";
import { SearchResults } from "./components/search-results";

import {
  ClerkProvider as _ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { LandingBanner } from "@/components/landing-banner";
import { useIsAdmin } from "./hooks/use-is-admin";

export default function Home() {
  const [results, setResults] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <SignedIn>
        <main className="flex min-h-screen flex-col p-4 sm:p-8 md:px-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Zafron</h1>

            <p>Next Gen Search</p>
          </div>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Corpora</h1>
              <CreateCorpusDialog />
            </div>
            <CorporaFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setResults={setResults}
            />
            {searchTerm && results ? (
              results?.length === 0 ? (
                <div className="text-center mt-32">
                  <h1 className="text-2xl font-light">Nothing here</h1>

                  <p className="font-extralight text-gray-600">
                    Please try a different term and try again
                  </p>
                </div>
              ) : (
                <SearchResults results={results} />
              )
            ) : (
              <CorporaList />
            )}
          </main>
        </main>
      </SignedIn>

      <SignedOut>
        <LandingBanner />
      </SignedOut>
    </>
  );
}
