import React from "react";
import axios from "axios";
import "./App.css";

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
      <div class="google">
        <a href="#" id="google_logo">
          <img
            src="http://i1381.photobucket.com/albums/ah215/mzartdesigns/google-logo_zpspkcztsjo.png"
            alt=" photo google-logo_zpspkcztsjo.png"
          />
        </a>
      </div>

      <div class="form">
        <form>
          <label for="form-search"></label>
          <input
            type="text"
            id="form-search"
            placeholder="Search AnyThing or type URL"
            onChange={handleChange}
          />
        </form>
      </div>

      <div class="buttons">
        <input type="submit" value="Find Anything" onClick={handleSubmit} />
      </div>
      {data ? (
        data.map((item, i) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: 100,
              }}
            >
              <p>{item.url}</p>
              <h4 style={{ cursor: "pointer" }}>{item.title}</h4>
              <p>{item.description}</p>
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
