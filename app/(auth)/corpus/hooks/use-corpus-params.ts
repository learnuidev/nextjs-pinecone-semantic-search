import { useParams } from "next/navigation";

export const useCorpusParams = () => {
  const params = useParams<{ "corpus-name": string }>();

  return {
    corpusName: params["corpus-name"],
  };
};
