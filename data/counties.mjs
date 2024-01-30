import dotenv from "dotenv";
import OpenAI from "openai";
import fs from "fs";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function gen_counties_json() {
  const systemContent = `
      You are an expert Chinese Geographer and Mandarin and English Expert
      
      please use data and return in json format for example if i provide:
      117 autonomous counties:
      Inner Mongolia Autonomous Region: 3, namely, Ewenki Autonomous County, Oroqen Autonomous County, and Daur Autonomous County.
      ...
      then return in following JSON format: 
      "total_counties": 117,
      "list": [{
       "name": "Inner Mongolia Autonomous Regtion",
      "counties": [{
          "en": "Ewenki Autonomous ...",
          "hanzi":  "鄂温克族自治旗"
       }]
       ...
      
      data:
      117 autonomous counties:
      Inner Mongolia Autonomous Region: 3, namely, Ewenki Autonomous County, Oroqen Autonomous County, and Daur Autonomous County.
      Guangxi Zhuang Autonomous Region: 12, namely, Longlin Autonomous County, Daxin Autonomous County, Lingyun Autonomous County, Bama Yao Autonomous County, Donglan Autonomous County, Du'an Yao Autonomous County, Jinxiu Yao Autonomous County, Yao Autonomous County, Longsheng Autonomous County, Rongshui Miao Autonomous County, Liannan Miao Autonomous County, and Maonan Autonomous County.
      Tibet Autonomous Region: 7, namely, Chamdo Prefecture, Nyingchi Prefecture, Shannan Prefecture, Lhoka Prefecture, Ngari Prefecture, Qamdo Prefecture, and Xigaze Prefecture.
      Xinjiang Uygur Autonomous Region: 6, namely, Ili Kazakh Autonomous Prefecture, Aksu Prefecture, Kizilsu Kirgiz Autonomous Prefecture, Hotan Prefecture, Kashgar Prefecture, and Yili Prefecture.
      Qinghai Province: 5, namely, Huangnan Tibetan Autonomous Prefecture, Hainan Tibetan Autonomous Prefecture, Golog Tibetan Autonomous Prefecture, Yushu Tibetan Autonomous Prefecture, and Haixi Mongolian and Tibetan Autonomous Prefecture.
      Sichuan Province: 4, namely, Aba Tibetan and Qiang Autonomous Prefecture, Garzê Tibetan Autonomous Prefecture, Liangdang Autonomous County, and Muli Tibetan Autonomous County.
      Yunnan Province: 29, namely, Dehong Dai and Jingpo Autonomous Prefecture, Nujiang Lisu Autonomous Prefecture, Diqing Tibetan Autonomous Prefecture, Xishuangbanna Dai Autonomous Prefecture, Baoshan City, Yuxi City, Lijiang City, Pu'er City, Qujing City, Honghe Hani and Yi Autonomous Prefecture, Wenshan Zhuang and Miao Autonomous Prefecture, and Lincang City.
      Gansu Province: 7, namely, Tibetan Autonomous Prefecture of Gannan, Tibetan Autonomous Prefecture of Tianzhu, Dongxiang Autonomous County, Salar Autonomous County, Baiyin City, Wuwei City, and Zhangye City.
      Hunan Province: 7, namely, Xiangxi Tujia and Miao Autonomous Prefecture, Shaoyang City, Tongdao Dong Autonomous County, Jishou City, Huaihua City, and Yongshou County.
      Hubei Province: 2, namely, Enshi Tujia and Miao Autonomous Prefecture and Lichuan Tujia Autonomous Prefecture.
      
      There are a total of 117 autonomous counties in China, distributed in 14 provinces, autonomous regions and municipalities directly under the Central Government. The following are the specific autonomous counties and their locations:
      Xinjiang Uygur Autonomous Region (27):巴里坤哈萨克自治县, 木垒哈萨克自治县, 察布查尔锡伯自治县, 霍城县, 巩留县, 新源县, 昭苏县, 特克斯县, 尼勒克县, 阿克陶县, 阿合奇县, 乌恰县, 阿图什市, 柯坪县, 温宿县, 沙雅县, 新和县, 拜城县, 乌什县, 阿克苏市, 库车县, 尉犁县, 轮台县, 若羌县, 且末县, 焉耆回族自治县, 和静县, 和硕县, 博湖县
      Tibet Autonomous Region (7):芒康县, 左贡县, 察隅县, 朗县, 墨脱县, 米林县, 林芝县
      Inner Mongolia Autonomous Region (3):莫力达瓦达斡尔族自治旗, 鄂伦春自治旗, 鄂温克族自治旗
      Guangxi Zhuang Autonomous Region (12):龙胜各族自治县, 金秀瑶族自治县, 融水苗族自治县, 三江侗族自治县, 隆林各族自治县, 恭城瑶族自治县, 都安瑶族自治县, 富川瑶族自治县, 环江毛南族自治县, 罗城仫佬族自治县, 巴马瑶族自治县, 大化瑶族自治县
      Yunnan Province (29):河口瑶族自治县, 金平苗族瑶族傣族自治县, 泸西县, 绿春县, 砚山县, 西畴县, 麻栗坡县, 马关县, 丘北县, 广南县, 富宁县, 孟连傣族拉祜族佤族自治县, 澜沧拉祜族自治县, 西盟佤族自治县, 江城哈尼族彝族自治县, 墨江哈尼族自治县, 景东彝族自治县, 景谷傣族彝族自治县, 镇沅彝族哈尼族拉祜族自治县, 元江哈尼族彝族傣族自治县, 新平彝族傣族自治县, 峨山彝族自治县, 易门县, 双柏县, 牟定县, 南华县, 姚安县, 大姚县, 永仁县, 元谋县, 武定县
      Guizhou Province (11):三都水族自治县, 紫云苗族布依族自治县, 关岭布依族苗族自治县, 镇宁布依族苗族自治县, 威宁彝族回族苗族自治县, 玉屏侗族自治县, 松桃苗族自治县, 印江土家族苗族自治县, 沿河土家族自治县, 务川仡佬族苗族自治县, 道真仡佬族苗族自治县
      Qinghai Province (7):互助土族自治县, 大通回族土族自治县, 民和回族土族自治县, 化隆回族自治县, 循化撒拉族自治县, 门源回族自治县, 祁连县
      Gansu Province (7):东乡族自治县, 积石山保安族东乡族撒拉族自治县, 张家川回族自治县, 肃南裕固族自治县, 肃北蒙古族自治县, 阿克塞哈萨克族自治县, 天祝藏族自治县
      Ningxia Hui Autonomous Region (2):泾源县, 彭阳县
      Hunan Province (7):城步苗族自治县, 江华瑶族自治县, 麻阳苗族自治县, 通道侗族自治县, 新晃侗族自治县, 芷江侗族自治县, 靖州苗族侗族自治县
      Hubei Province (2):长阳土家族自治县, 五峰土家族自治县
      Jilin Province (1):长白朝鲜族自治县
      Heilongjiang Province (1):杜尔伯特蒙古族自治县`;

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemContent,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const resp = await chatCompletion?.choices?.[0]?.message?.content;

  return resp;
}

gen_counties_json().then((res) => {
  console.log("DATA: ", res);
  fs.writeFileSync("test_v4.json", res);
});
