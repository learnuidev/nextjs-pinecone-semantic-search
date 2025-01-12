const { Pinecone } = require("@pinecone-database/pinecone");
const { pc } = require("./00-pc");

// Define a sample dataset where each item has a unique ID and piece of text
const data = [
  {
    id: "vec1",
    text: "Apple is a popular fruit known for its sweetness and crisp texture.",
  },
  {
    id: "vec2",
    text: "The tech company Apple is known for its innovative products like the iPhone.",
  },
  { id: "vec3", text: "Many people enjoy eating apples as a healthy snack." },
  {
    id: "vec4",
    text: "Apple Inc. has revolutionized the tech industry with its sleek designs and user-friendly interfaces.",
  },
  {
    id: "vec5",
    text: "An apple a day keeps the doctor away, as the saying goes.",
  },
  {
    id: "vec6",
    text: "Apple Computer Company was founded on April 1, 1976, by Steve Jobs, Steve Wozniak, and Ronald Wayne as a partnership.",
  },
  {
    id: "vec7",
    text: `华为（Huawei）是一家全球领先的信息与通信技术（ICT）解决方案提供商，总部位于中国深圳。公司成立于1987年，由任正非创立。华为的业务涵盖电信网络、企业网络、消费者设备和云计算等领域，产品和服务遍布全球170多个国家和地区。

华为在5G技术、智能手机、芯片设计（如麒麟系列）以及人工智能等领域具有重要影响力。尽管近年来在国际市场上面临一些挑战，华为仍致力于技术创新和全球化发展，是全球ICT行业的重要参与者之一。`,
  },
];

// Convert the text into numerical vectors that Pinecone can index
const model = "multilingual-e5-large";

const indexName = "apple";
const index = pc.Index(indexName);

pc.inference
  .embed(
    model,
    data.map((d) => d.text),
    { inputType: "passage", truncate: "END" }
  )
  .then(async (embeddings) => {
    const records = data.map((d, i) => ({
      id: d.id,
      values: embeddings[i].values,
      metadata: { text: d.text },
    }));

    // Upsert the vectors into the index
    await index.namespace("apple-inc").upsert(records);

    console.log(JSON.stringify(embeddings, null, 4));
  });
