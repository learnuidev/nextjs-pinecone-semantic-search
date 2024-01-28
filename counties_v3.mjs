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
      name: "Xinjiang Uygur Autonomous Region",
      total: 27,
      counties: [
        { hanzi: "巴里坤哈萨克自治县", en: "", pinyin: "" },
        { hanzi: "木垒哈萨克自治县", en: "", pinyin: "" },
        { hanzi: "察布查尔锡伯自治县", en: "", pinyin: "" },
        { hanzi: "霍城县", en: "", pinyin: "" },
        { hanzi: "巩留县", en: "", pinyin: "" },
        { hanzi: "新源县", en: "", pinyin: "" },
        { hanzi: "昭苏县", en: "", pinyin: "" },
        { hanzi: "特克斯县", en: "", pinyin: "" },
        { hanzi: "尼勒克县", en: "", pinyin: "" },
        { hanzi: "阿克陶县", en: "", pinyin: "" },
        { hanzi: "阿合奇县", en: "", pinyin: "" },
        { hanzi: "乌恰县", en: "", pinyin: "" },
        { hanzi: "阿图什市", en: "", pinyin: "" },
        { hanzi: "柯坪县", en: "", pinyin: "" },
        { hanzi: "温宿县", en: "", pinyin: "" },
        { hanzi: "沙雅县", en: "", pinyin: "" },
        { hanzi: "新和县", en: "", pinyin: "" },
        { hanzi: "拜城县", en: "", pinyin: "" },
        { hanzi: "乌什县", en: "", pinyin: "" },
        { hanzi: "阿克苏市", en: "", pinyin: "" },
        { hanzi: "库车县", en: "", pinyin: "" },
        { hanzi: "尉犁县", en: "", pinyin: "" },
        { hanzi: "轮台县", en: "", pinyin: "" },
        { hanzi: "若羌县", en: "", pinyin: "" },
        { hanzi: "且末县", en: "", pinyin: "" },
        { hanzi: "焉耆回族自治县", en: "", pinyin: "" },
        { hanzi: "和静县", en: "", pinyin: "" },
        { hanzi: "和硕县", en: "", pinyin: "" },
        { hanzi: "博湖县", en: "", pinyin: "" },
      ],
    },
    {
      name: "Tibet Autonomous Region",
      total: 7,
      counties: [
        { hanzi: "芒康县", en: "", pinyin: "" },
        { hanzi: "左贡县", en: "", pinyin: "" },
        { hanzi: "察隅县", en: "", pinyin: "" },
        { hanzi: "朗县", en: "", pinyin: "" },
        { hanzi: "墨脱县", en: "", pinyin: "" },
        { hanzi: "米林县", en: "", pinyin: "" },
        { hanzi: "林芝县", en: "", pinyin: "" },
      ],
    },
    {
      name: "Inner Mongolia Autonomous Region",
      total: 3,
      counties: [
        { hanzi: "莫力达瓦达斡尔族自治旗", en: "", pinyin: "" },
        { hanzi: "鄂伦春自治旗", en: "", pinyin: "" },
        { hanzi: "鄂温克族自治旗", en: "", pinyin: "" },
      ],
    },
    {
      name: "Guangxi Zhuang Autonomous Region",
      total: 12,
      counties: [
        { hanzi: "龙胜各族自治县", en: "", pinyin: "" },
        { hanzi: "金秀瑶族自治县", en: "", pinyin: "" },
        { hanzi: "融水苗族自治县", en: "", pinyin: "" },
        { hanzi: "三江侗族自治县", en: "", pinyin: "" },
        { hanzi: "隆林各族自治县", en: "", pinyin: "" },
        { hanzi: "恭城瑶族自治县", en: "", pinyin: "" },
        { hanzi: "都安瑶族自治县", en: "", pinyin: "" },
        { hanzi: "富川瑶族自治县", en: "", pinyin: "" },
        { hanzi: "环江毛南族自治县", en: "", pinyin: "" },
        { hanzi: "罗城仫佬族自治县", en: "", pinyin: "" },
        { hanzi: "巴马瑶族自治县", en: "", pinyin: "" },
        { hanzi: "大化瑶族自治县", en: "", pinyin: "" },
      ],
    },
    {
      name: "Yunnan Province",
      total: 29,
      counties: [
        { hanzi: "河口瑶族自治县", en: "", pinyin: "" },
        { hanzi: "金平苗族瑶族傣族自治县", en: "", pinyin: "" },
        { hanzi: "泸西县", en: "", pinyin: "" },
        { hanzi: "绿春县", en: "", pinyin: "" },
        { hanzi: "砚山县", en: "", pinyin: "" },
        { hanzi: "西畴县", en: "", pinyin: "" },
        { hanzi: "麻栗坡县", en: "", pinyin: "" },
        { hanzi: "马关县", en: "", pinyin: "" },
        { hanzi: "丘北县", en: "", pinyin: "" },
        { hanzi: "广南县", en: "", pinyin: "" },
        { hanzi: "富宁县", en: "", pinyin: "" },
        { hanzi: "孟连傣族拉祜族佤族自治县", en: "", pinyin: "" },
        { hanzi: "澜沧拉祜族自治县", en: "", pinyin: "" },
        { hanzi: "西盟佤族自治县", en: "", pinyin: "" },
        { hanzi: "江城哈尼族彝族自治县", en: "", pinyin: "" },
        { hanzi: "墨江哈尼族自治县", en: "", pinyin: "" },
        { hanzi: "景东彝族自治县", en: "", pinyin: "" },
        { hanzi: "景谷傣族彝族自治县", en: "", pinyin: "" },
        { hanzi: "镇沅彝族哈尼族拉祜族自治县", en: "", pinyin: "" },
        { hanzi: "元江哈尼族彝族傣族自治县", en: "", pinyin: "" },
        { hanzi: "新平彝族傣族自治县", en: "", pinyin: "" },
        { hanzi: "峨山彝族自治县", en: "", pinyin: "" },
        { hanzi: "易门县", en: "", pinyin: "" },
        { hanzi: "双柏县", en: "", pinyin: "" },
        { hanzi: "牟定县", en: "", pinyin: "" },
        { hanzi: "南华县", en: "", pinyin: "" },
        { hanzi: "姚安县", en: "", pinyin: "" },
        { hanzi: "大姚县", en: "", pinyin: "" },
        { hanzi: "永仁县", en: "", pinyin: "" },
        { hanzi: "元谋县", en: "", pinyin: "" },
        { hanzi: "武定县", en: "", pinyin: "" },
      ],
    },
    {
      name: "Guizhou Province",
      total: 11,
      counties: [
        { hanzi: "三都水族自治县", en: "", pinyin: "" },
        { hanzi: "紫云苗族布依族自治县", en: "", pinyin: "" },
        { hanzi: "关岭布依族苗族自治县", en: "", pinyin: "" },
        { hanzi: "镇宁布依族苗族自治县", en: "", pinyin: "" },
        { hanzi: "威宁彝族回族苗族自治县", en: "", pinyin: "" },
        { hanzi: "玉屏侗族自治县", en: "", pinyin: "" },
        { hanzi: "松桃苗族自治县", en: "", pinyin: "" },
        { hanzi: "印江土家族苗族自治县", en: "", pinyin: "" },
        { hanzi: "沿河土家族自治县", en: "", pinyin: "" },
        { hanzi: "务川仡佬族苗族自治县", en: "", pinyin: "" },
        { hanzi: "道真仡佬族苗族自治县", en: "", pinyin: "" },
      ],
    },
    {
      name: "Qinghai Province",
      total: 7,
      counties: [
        { hanzi: "互助土族自治县", en: "", pinyin: "" },
        { hanzi: "大通回族土族自治县", en: "", pinyin: "" },
        { hanzi: "民和回族土族自治县", en: "", pinyin: "" },
        { hanzi: "化隆回族自治县", en: "", pinyin: "" },
        { hanzi: "循化撒拉族自治县", en: "", pinyin: "" },
        { hanzi: "门源回族自治县", en: "", pinyin: "" },
        { hanzi: "祁连县", en: "", pinyin: "" },
      ],
    },
    {
      name: "Gansu Province",
      total: 7,
      counties: [
        { hanzi: "东乡族自治县", en: "", pinyin: "" },
        { hanzi: "积石山保安族东乡族撒拉族自治县", en: "", pinyin: "" },
        { hanzi: "张家川回族自治县", en: "", pinyin: "" },
        { hanzi: "肃南裕固族自治县", en: "", pinyin: "" },
        { hanzi: "肃北蒙古族自治县", en: "", pinyin: "" },
        { hanzi: "阿克塞哈萨克族自治县", en: "", pinyin: "" },
        { hanzi: "天祝藏族自治县", en: "", pinyin: "" },
      ],
    },
    {
      name: "Ningxia Hui Autonomous Region",
      total: 2,
      counties: [
        { hanzi: "泾源县", en: "", pinyin: "" },
        { hanzi: "彭阳县", en: "", pinyin: "" },
      ],
    },
    {
      name: "Hunan Province",
      total: 7,
      counties: [
        { hanzi: "城步苗族自治县", en: "", pinyin: "" },
        { hanzi: "江华瑶族自治县", en: "", pinyin: "" },
        { hanzi: "麻阳苗族自治县", en: "", pinyin: "" },
        { hanzi: "通道侗族自治县", en: "", pinyin: "" },
        { hanzi: "新晃侗族自治县", en: "", pinyin: "" },
        { hanzi: "芷江侗族自治县", en: "", pinyin: "" },
        { hanzi: "靖州苗族侗族自治县", en: "", pinyin: "" },
      ],
    },
    {
      name: "Hubei Province",
      total: 2,
      counties: [
        { hanzi: "长阳土家族自治县", en: "", pinyin: "" },
        { hanzi: "五峰土家族自治县", en: "", pinyin: "" },
      ],
    },
    {
      name: "Jilin Province",
      total: 1,
      counties: [{ hanzi: "长白朝鲜族自治县", en: "", pinyin: "" }],
    },
    {
      name: "Heilongjiang Province",
      total: 1,
      counties: [{ hanzi: "杜尔伯特蒙古族自治县", en: "", pinyin: "" }],
    },
  ],
};

async function gen_counties_json(input) {
  const systemContent = `
      You are an expert Chinese Geographer and Mandarin and English Expert
      
      I have provided data in json format which contains 117 autonomous counties:
      For all of them english (en) and pinyin is missing, can you please fill the english (en) and pinyin and return in
      stringified JSON format

      Please provide transliterations for ALL the hanzi
      
      data:
      ${JSON.stringify(input)}`;

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

await Promise.all(
  new Array(12)
    .fill(1)
    .map((x, i) => x + i)
    .map((idx) => {
      return gen_counties_json(data.list[idx]).then((res) => {
        console.log(`DATA: ${idx}`, res);
        fs.writeFileSync(`${Date.now()}.json`, res);
      });
    })
);
