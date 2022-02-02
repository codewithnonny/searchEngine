const search_engine = require("search-engine-nodejs").default;
const express = require("express");
const cors = require("cors");
const server = express();
const path = require("path");

const searchEngine = async (q, page) => {
  const options = {
    pageOfResult: page,
    qs: {
      q,
    },
  };

  const results = await search_engine.Yahoo(options);

  return results;
};

server.use(express.json());
server.use(cors());

server.use(express.static(path.join(__dirname, "client/build")));
console.log(__dirname);

server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build/index.html"));
});

server.post("/search", async (req, res) => {
  console.log(req.body);
  const { search, page } = req.body;
  const data = await searchEngine(search, page);
  console.log(data);
  res.status(200).json({ searchResult: data });
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
