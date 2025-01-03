import { appConfig } from "@/config/app-config";
import { google } from "googleapis";
import { ListVideosParams } from "./types";

// 1. Create a YouTube API client
const youtube = google.youtube({
  version: "v3",
  auth: appConfig.youtubeAPIKey,
});

{
  /*
  Makes API request to search videos by channel name or Id
*/
}
export const listVideos = ({ query }: ListVideosParams) => {
  let params = {
    part: "snippet",
    // part: "snippet,statistics",
    type: "video",
    order: "viewCount",
    maxResults: 10, // Adjust the number of results as needed
  } as any;

  if (query) {
    params.q = query;
  }

  return youtube.search.list(params).then((items) => {
    return items.data.items;
  });
};
