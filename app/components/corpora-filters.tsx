"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { useListSearchResultsMutation } from "@/domain/search/search.queries";
import { searchResultsIndex } from "@/lib/search-results-index";
import { useGetEmail } from "../hooks/use-get-email";

export default function CorporaFilters({
  setResults,
  searchTerm,
  setSearchTerm,
}: any) {
  const emailAddress = useGetEmail();

  const listSearchResultsMutation = useListSearchResultsMutation();

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          value={searchTerm}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setSearchTerm("");
            }
            if (event.key === "Enter") {
              listSearchResultsMutation
                .mutateAsync({
                  query: searchTerm,
                  corpusName: searchResultsIndex,
                  rerank: true,
                  nameSpace: `${emailAddress}_search-result`,
                  model: "multilingual-e5-large",
                })
                .then((resp) => {
                  setResults(resp);
                });
            }
          }}
          placeholder="Search corpora"
          className="pl-10"
        />
      </div>
    </div>
  );
}
