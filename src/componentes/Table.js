import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Tableta() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //usar useEfect para hacer la peticion cuando el componente se monte
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        if (!response.ok) {
          throw new Error("Error al cargar los Pokémons");
        }
        const data = await response.json();
        setPokemons(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []); // El array vacio significa que se ejecuta solo una vez al montar

  const handleViewPokemon = (pokemonName, pokemonUrl) => {
    navigate(`/pokemon/${pokemonName}`, {
      state: {
        name: pokemonName,
        url: pokemonUrl,
      },
    });
  };
  if (loading) return <div>Cargando Pokemon...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1e2a38ff",
        fontFamily: "'Press Start 2P', cursive",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "#ffcc00ff",
          WebkitTextStroke: "2px blue",
          fontWeight: "bold",
          fontSize: "55px",
        }}
      >
        Lista de Pokémons
      </h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {pokemons.map((pokemon, index) => (
          <li
            key={index}
            style={{
              margin: "15px 0",
              padding: "10px",
              border: "2px solid #0731d8ff",
              borderRadius: "8px",
              backgroundColor: "#e9c46a",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`}
                alt={pokemon.name}
                style={{ marginRight: "15px", width: "100px", height: "100px" }}
              />

              {/* Nombre del Pokémon */}
              <span
                style={{
                  textTransform: "capitalize",
                  fontSize: "18px",
                  color: "#264653",
                }}
              >
                {pokemon.name}
              </span>
            </div>

            {/* Botón */}
            <button
              onClick={() => handleViewPokemon(pokemon.name, pokemon.url)}
              style={{
                padding: "5px 15px",
                backgroundColor: "#457b9d",
                color: "white",
                border: "2px solid #f4a261",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1d3557")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#457b9d")}
            >
              Ver
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tableta;
