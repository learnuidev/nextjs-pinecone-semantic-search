export type ResourceTypes = "video" | "audio" | "website";
export interface Resource {
  type: ResourceTypes;
  content: string;
}

export type AddResourceParams = Resource & {
  userId: string;
};
