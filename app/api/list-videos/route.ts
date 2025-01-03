import { listVideos } from "./api";
import { ListVideosParams } from "./types";

export async function POST(req: Request) {
  const { query } = (await req.json()) as ListVideosParams;

  const resp = await listVideos({ query });

  return Response.json(resp);
}
