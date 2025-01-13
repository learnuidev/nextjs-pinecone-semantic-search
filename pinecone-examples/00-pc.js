const { Pinecone } = require("@pinecone-database/pinecone");

const pc = new Pinecone({
  apiKey:
    "pcsk_kRvWN_S7nCQGgQSGtwywPPcMFRhYyRAGRRF5EyfxBjP18Njp79DqTi4sEyncdZyde3YGM",
});

module.exports = {
  pc,
};
