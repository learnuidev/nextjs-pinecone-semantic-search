import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// Set up Google search
const options = {
  page: 1, // The page number of search results to retrieve
  limit: 5, // The number of search results per page
};

// const customsearch = google.search({
//   version: "v1",
//   auth: process.env.YOUTUBE_API_KEY,
// });

async function runGoogleSearch(searchTerm) {
  const numberOfResults = 5;
  const customsearch = google.customsearch("v1");

  try {
    const res = await customsearch.cse.list({
      cx: "504f46a4a9d114cfc",
      q: searchTerm,
      //   num: numberOfResults,
      auth: process.env.YOUTUBE_API_KEY,
    });

    const items = res.data.items;

    // items.forEach((item) => {
    //   console.log(`${item.title}: ${item.link}`);
    //   console.log(item.snippet);
    //   console.log("-------------------------");
    // });
    return items;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

runGoogleSearch("huawei financial statements").then((res) => {
  console.log("SEARCH: ", res);
});
