import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const data = {
  total_counties: 117,
  list: [
    {
      name: "Inner Mongolia Autonomous Region",
      counties: [
        {
          en: "Ewenki Autonomous County",
          hanzi: "鄂温克族自治旗",
        },
        {
          en: "Oroqen Autonomous County",
          hanzi: "鄂伦春自治旗",
        },
        {
          en: "Daur Autonomous County",
          hanzi: "莫力达瓦达斡尔族自治旗",
        },
      ],
    },
    {
      name: "Guangxi Zhuang Autonomous Region",
      counties: [
        {
          en: "Longlin Autonomous County",
          hanzi: "隆林各族自治县",
        },
        {
          en: "Daxin Autonomous County",
          hanzi: "",
        },
        {
          en: "Lingyun Autonomous County",
          hanzi: "",
        },
        {
          en: "Bama Yao Autonomous County",
          hanzi: "巴马瑶族自治县",
        },
        {
          en: "Donglan Autonomous County",
          hanzi: "",
        },
        {
          en: "Du'an Yao Autonomous County",
          hanzi: "",
        },
        {
          en: "Jinxiu Yao Autonomous County",
          hanzi: "金秀瑶族自治县",
        },
        {
          en: "Yao Autonomous County",
          hanzi: "",
        },
        {
          en: "Longsheng Autonomous County",
          hanzi: "龙胜各族自治县",
        },
        {
          en: "Rongshui Miao Autonomous County",
          hanzi: "融水苗族自治县",
        },
        {
          en: "Liannan Miao Autonomous County",
          hanzi: "",
        },
        {
          en: "Maonan Autonomous County",
          hanzi: "",
        },
      ],
    },
    {
      name: "Tibet Autonomous Region",
      counties: [
        {
          en: "Chamdo Prefecture",
          hanzi: "芒康县",
        },
        {
          en: "Nyingchi Prefecture",
          hanzi: "林芝县",
        },
        {
          en: "Shannan Prefecture",
          hanzi: "",
        },
        {
          en: "Lhoka Prefecture",
          hanzi: "",
        },
        {
          en: "Ngari Prefecture",
          hanzi: "",
        },
        {
          en: "Qamdo Prefecture",
          hanzi: "",
        },
        {
          en: "Xigaze Prefecture",
          hanzi: "",
        },
      ],
    },
    {
      name: "Xinjiang Uygur Autonomous Region",
      counties: [
        {
          en: "Ili Kazakh Autonomous Prefecture",
          hanzi: "巴里坤哈萨克自治县",
        },
        {
          en: "Aksu Prefecture",
          hanzi: "阿克苏市",
        },
        {
          en: "Kizilsu Kirgiz Autonomous Prefecture",
          hanzi: "阿克陶县",
        },
        {
          en: "Hotan Prefecture",
          hanzi: "和田地区",
        },
        {
          en: "Kashgar Prefecture",
          hanzi: "喀什地区",
        },
        {
          en: "Yili Prefecture",
          hanzi: "伊犁哈萨克自治州",
        },
      ],
    },
    {
      name: "Qinghai Province",
      counties: [
        {
          en: "Huangnan Tibetan Autonomous Prefecture",
          hanzi: "",
        },
        {
          en: "Hainan Tibetan Autonomous Prefecture",
          hanzi: "",
        },
        {
          en: "Golog Tibetan Autonomous Prefecture",
          hanzi: "",
        },
        {
          en: "Yushu Tibetan Autonomous Prefecture",
          hanzi: "",
        },
        {
          en: "Haixi Mongolian and Tibetan Autonomous Prefecture",
          hanzi: "",
        },
      ],
    },
    {
      name: "Sichuan Province",
      counties: [
        {
          en: "Aba Tibetan and Qiang Autonomous Prefecture",
          hanzi: "",
        },
        {
          en: "Garzê Tibetan Autonomous Prefecture",
          hanzi: "",
        },
        {
          en: "Liangdang Autonomous County",
          hanzi: "",
        },
        {
          en: "Muli Tibetan Autonomous County",
          hanzi: "",
        },
      ],
    },
    {
      name: "Yunnan Province",
      counties: [
        {
          en: "Dehong Dai and Jingpo Autonomous Prefecture",
          hanzi: "",
        },
        {
          en: "Nujiang Lisu Autonomous Prefecture",
          hanzi: "",
        },
        {
          en: "Diqing Tibetan Autonomous Prefecture",
          hanzi: "",
        },
        {
          en: "Xishuangbanna Dai Autonomous Prefecture",
          hanzi: "",
        },
        {
          en: "Baoshan City",
          hanzi: "",
        },
        {
          en: "Yuxi City",
          hanzi: "",
        },
        {
          en: "Lijiang City",
          hanzi: "",
        },
        {
          en: "Pu'er City",
          hanzi: "",
        },
        {
          en: "Qujing City",
          hanzi: "",
        },
        {
          en: "Honghe Hani and Yi Autonomous Prefecture",
          hanzi: "",
        },
        {
          en: "Wenshan Zhuang and Miao Autonomous Prefecture",
          hanzi: "",
        },
        {
          en: "Lincang City",
          hanzi: "",
        },
      ],
    },
    {
      name: "Gansu Province",
      counties: [
        {
          en: "Tibetan Autonomous Prefecture of Gannan",
          hanzi: "",
        },
        {
          en: "Tibetan Autonomous Prefecture of Tianzhu",
          hanzi: "",
        },
        {
          en: "Dongxiang Autonomous County",
          hanzi: "东乡族自治县",
        },
        {
          en: "Salar Autonomous County",
          hanzi: "",
        },
        {
          en: "Baiyin City",
          hanzi: "",
        },
        {
          en: "Wuwei City",
          hanzi: "",
        },
        {
          en: "Zhangye City",
          hanzi: "",
        },
      ],
    },
    {
      name: "Hunan Province",
      counties: [
        {
          en: "Xiangxi Tujia and Miao Autonomous Prefecture",
          hanzi: "",
        },
        {
          en: "Shaoyang City",
          hanzi: "",
        },
        {
          en: "Tongdao Dong Autonomous County",
          hanzi: "",
        },
        {
          en: "Jishou City",
          hanzi: "",
        },
        {
          en: "Huaihua City",
          hanzi: "",
        },
        {
          en: "Yongshou County",
          hanzi: "",
        },
      ],
    },
    {
      name: "Hubei Province",
      counties: [
        {
          en: "Enshi Tujia and Miao Autonomous Prefecture",
          hanzi: "",
        },
        {
          en: "Lichuan Tujia Autonomous Prefecture",
          hanzi: "",
        },
      ],
    },
  ],
};

async function gen_counties_json() {
  const systemContent = `
      You are an expert Chinese Geographer and Mandarin and English Expert
      
      I have provided data in json format which contains 117 autonomous counties:
      For some of them hanzi is missing, can you please fill the hanzi and return in
      stringified JSON format
      
      
      data:
      ${JSON.stringify(data)}`;

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

gen_counties_json().then((res) => {
  console.log("DATA: ", res);
  fs.writeFileSync("test_v2.json", res);
});
