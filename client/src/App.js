import logo from "./logo.svg";
import "./App.css";
import React from "react";
import axios from "axios";

function App() {
  const [search, setSearch] = React.useState({
    search: "",
    page: "1",
  });

  const [data, setData] = React.useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSearch({ ...search, search: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/search", search)
      .then(function (response) {
        setData(response.data.searchResult);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(data);
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Anything"
          onChange={handleChange}
          name="search"
        />
        <button type="submit">Search</button>
      </form>
      {data ? (
        data.map((item, i) => {
          return (
            <div key={i} style={{ display: "flex", flexDirection: "column" }}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a>{item.url}</a>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
