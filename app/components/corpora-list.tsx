"use client";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Copy, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCorpusParams } from "../corpus/hooks/use-corpus-params";
import { useListCorporaQuery } from "../hooks/use-list-corpora-query";

export function CorporaList() {
  const { data: corpora } = useListCorporaQuery();
  const { corpusName } = useCorpusParams();

  const router = useRouter();
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Showing {corpora?.indexes?.length} corpora{" "}
      </p>
      {corpora?.indexes?.map((index) => (
        <div key={index.name} className="border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{index.name}</h3>
              {index?.status?.ready ? (
                <span className="h-2 w-2 rounded-full bg-green-500" />
              ) : (
                <span className="h-2 w-2 rounded-full bg-orange-500" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => {
                  router.push(`/corpus/${index?.name}`);
                }}
              >
                Connect
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Host:</span>
              <span className="text-sm text-muted-foreground">
                {index.host}
              </span>
              <Button variant="ghost" size="icon" className="h-4 w-4">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary">
                Cloud: {index?.spec?.serverless?.cloud}
              </Badge>
              <Badge variant="secondary">
                Region: {index?.spec?.serverless?.region}
              </Badge>
              <Badge variant="secondary">
                Capacity mode: {index?.spec?.serverless ? "Serverless" : "Pod"}
              </Badge>
              <Badge variant="secondary">Dimension: {index.dimension}</Badge>
            </div>
            {/* {index.embeddingModel && (
              <div className="flex items-center gap-2">
                <span className="text-sm">embedding_model:</span>
                <span className="text-sm text-muted-foreground">
                  {index.embeddingModel}
                </span>
              </div>
            )} */}
          </div>
        </div>
      ))}
    </div>
  );
}
