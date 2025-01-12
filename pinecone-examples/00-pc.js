const { Pinecone } = require("@pinecone-database/pinecone");

const pc = new Pinecone({
  apiKey: "",
});

module.exports = {
  pc,
};
