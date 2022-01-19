const search_engine = require("search-engine-nodejs").default;
const express = require("express");
const cors = require("cors");
const server = express();

const searchEngine = async (q, page) => {
  const options = {
    pageOfResult: page,
    qs: {
      q,
    },
  };

  // you can use: Aol, Ask, Baidu, Bing, Google or Yahoo
  const results = await search_engine.Yahoo(options);

  return results;
};

server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).json({ message: "search engine running" });
});

server.post("/search", async (req, res) => {
  console.log(req.body);
  const { search, page } = req.body;
  const data = await searchEngine(search, page);
  console.log(data);
  res.status(200).json({ searchResult: data });
});

const port = 3001;

server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
