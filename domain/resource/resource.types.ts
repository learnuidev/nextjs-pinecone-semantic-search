export type ResourceTypes = "video" | "audio" | "website" | "search-result";
export interface Resource {
  type: ResourceTypes;
  content: string;
}

export type AddResourceParams = Resource & {
  userId: string;
  corpusName: string;
};
