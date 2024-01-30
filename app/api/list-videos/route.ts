import { listVideos } from "./api";
import { ListVideosParams } from "./types";

export async function POST(req: Request) {
  const { query } = (await req.json()) as ListVideosParams;

  console.log("ListVideosParams", { query });

  const resp = await listVideos({ query });

  console.log("VIDEOS: ", resp);

  return Response.json(resp);
}
