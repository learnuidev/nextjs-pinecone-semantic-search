export type ResourceTypes = "video" | "audio" | "website" | "search-result";
export interface Resource {
  type: ResourceTypes;
  content: string;

  id: string;
}

export type AddResourceParams = Resource & {
  userId: string;
  corpusName: string;
  model: string;
  nameSpace: string;
  createdAt?: number;
};
