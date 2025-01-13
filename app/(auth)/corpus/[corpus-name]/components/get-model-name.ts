export function getModelName({ dimension }: { dimension: number }) {
  if (dimension === 1024) {
    return "multilingual-e5-large";
  }

  return "text-embedding-ada-2";
}
