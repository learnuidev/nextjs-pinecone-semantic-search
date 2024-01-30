import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function gen_counties_json() {
  const systemContent = `
  given a list of counties, please list their population. for each county please return in object like so
{"county": "...",
 "population: ".."

data:
[
    "Anning",
    "Bai",
    "Binchuan",
    "Changning",
    "Chenggong",
    "Chengjiang",
    "Chuxiong",
    "Dali",
    "Dayao",
    "Dayi",
    "Eshan",
    "Fumin",
    "Fuyuan",
    "Gucheng",
    "Hekou",
    "Honghe",
    "Huaping",
    "Huaning",
    "Huize",
    "Jianchuan",
    "Jiangchuan",
    "Jinping",
    "Kaiyuan",
    "Kunming",
    "Lanping",
    "Lijiang",
    "Liming",
    "Liuku",
    "Liupanshui",
    "Longchuan",
    "Longling",
    "Longyang",
    "Lufeng",
    "Luquan",
    "Luxi",
    "Maguan",
    "Malipo",
    "Menghai",
    "Mengla",
    "Menglian",
    "Mile",
    "Mouding",
    "Nanjian",
    "Nanhua",
    "Ninger",
    "Ninglang",
    "Panzhihua",
    "Pingbian",
    "Qiaojia",
    "Qilin",
    "Qujing",
    "Ruili",
    "Shangrila",
    "Shidian",
    "Shiping",
    "Shizong",
    "Shuangbai",
    "Shuangjiang",
    "Shuanglang",
    "Shuangyang",
    "Simao",
    "Songming",
    "Suining",
    "Tacheng",
    "Tengchong",
    "Weishan",
    "Weixin",
    "Wenshan",
    "Wuding",
    "Wuhua",
    "Wuming",
    "Wumeng",
    "Xiangyun",
    "Xichou",
    "Ximeng",
    "Xinping",
    "Xishan",
    "Xizhou",
    "Xuanwei",
    "Yanjin",
    "Yanshan",
    "Yaoan",
    "Yiliang",
    "Yimen",
    "Yingjiang",
    "Yongde",
    "Yongping",
    "Yongren",
    "Yongshan",
    "Yongsheng",
    "Yuanjiang",
    "Yuanmou",
    "Yuheng",
    "Yunlong",
    "Yunnan",
    "Yunxian",
    "Zhanyi",
    "Zhaotong",
    "Zhenkang",
    "Zhenxiong",
    "Zhenyuan",
    "Binchuan",
    "Chuxiong",
    "Dayao",
    "Eshan",
    "Fumin",
    "Fuyuan",
    "Gucheng",
    "Hekou",
    "Honghe",
    "Huaping",
    "Huaning",
    "Huize",
    "Jianchuan",
    "Jiangchuan",
    "Jinping",
    "Kaiyuan",
    "Kunming",
    "Lanping",
    "Lijiang",
    "Liming",
    "Liuku",
    "Liupanshui",
    "Longchuan",
    "Longling",
    "Longyang",
    "Lufeng",
    "Luquan",
    "Luxi"
  ]
      `;

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemContent,
      },
    ],
    model: "gpt-4-0125-preview",
  });

  const resp = await chatCompletion?.choices?.[0]?.message?.content;

  return resp;
}

gen_counties_json("").then((res) => {
  console.log(res);
  fs.writeFileSync(`${Date.now()}.json`, res);
});
