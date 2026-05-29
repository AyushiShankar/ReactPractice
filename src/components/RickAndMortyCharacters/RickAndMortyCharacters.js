import React, { useEffect, useState, useMemo } from "react";
import "./RickAndMortyCharacters.module.css";

function RickAndMortyCharacters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  const data = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const jsonData = await response.json();
      if (!response.ok || jsonData.length === 0) setError("No Characters found");
      setCharacters(jsonData.results);
    }
    catch (err) {
      setError("No Characters found");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    data();
  }, []);


  const filteredCharacters = useMemo(() => {

    return characters.filter((char) =>
      filter === "All" ? true : char.status === filter
    ).filter((char) =>
      char.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) =>
        sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
  },
    [characters, filter, search, sortOrder]);


  return (
    <div>
      <h1>Rick And Morty Characters</h1>
      <div className="container">
        <div className="controls">
          <input
            type="text"
            placeholder="Search by name..."
            data-testid="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select data-testid="status-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">unknown</option>
          </select>
          <select data-testid="sort-order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Sort A-Z</option>
            <option value="desc">Sort Z-A</option>
          </select>
        </div>

        {error || filteredCharacters.length === 0 && <p data-testid="error-message">No characters found</p>}
        {loading && <p data-testid="loading">Loading...</p>}
        {!error && !loading &&
          <div className="character-grid">
            {filteredCharacters.map((c) => (
              <div className="card" key={c.id}
                data-testid={`character-${c.id}`}>
                <img src={c.image} alt="card" />
                <h1 className="char-name">{c.name}</h1>
                <h1 className="char-status"
                  style={{
                    color: c.status === "Alive" ? "green" : c.status === "Dead" ? "red" : "gray"
                  }}>{c.status}</h1>
                <h1 className="char-species">{c.species}</h1>
              </div>
            ))}
          </div>
        }

      </div>
    </div>
  );
}

export default RickAndMortyCharacters;
