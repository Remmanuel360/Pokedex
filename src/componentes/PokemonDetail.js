import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PokemonDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { name, url } = location.state || {};

  useEffect(() => {
    if (url) {
      const fetchPokemonDetails = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setPokemonData(data);
        } catch (error) {
          console.error("Error fetching Pokémon details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPokemonDetails();
    }
  }, [url]);

  if (!name) {
    return <div>No se encontró el Pokémon</div>;
  }

  if (loading) {
    return <div>Cargando detalles de {name}...</div>;
  }

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        backgroundColor: "#1e2a38",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Press Start 2P', cursive",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "30px",
          padding: "10px 20px",
          backgroundColor: "#3b4cca",
          color: "white",
          border: "2px solid #ffde00",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "14px",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#2a34a0")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#3b4cca")}
      >
        ← Volver
      </button>

      <h1
        style={{
          textTransform: "capitalize",
          color: "#fff700", // amarillo
          WebkitTextStroke: "1.5px blue", // borde azul
          fontWeight: "bold",
          fontSize: "48px",
          marginBottom: "30px",
        }}
      >
        {name}
      </h1>

      {pokemonData && (
        <div>
          <img
            src={pokemonData.sprites.front_default}
            alt={name}
            style={{
              width: "200px",
              border: "3px solid #ffcb05",
              borderRadius: "15px",
              boxShadow: "0 0 20px #ffcb05",
              marginBottom: "30px",
            }}
          />

          <h3 style={{ color: "#ffcb05", marginBottom: "15px" }}>
            Estadísticas:
          </h3>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              fontSize: "18px",
              color: "#fff",
              maxWidth: "300px",
              margin: "0 auto",
              textTransform: "capitalize",
            }}
          >
            {pokemonData.stats.map((stat, index) => (
              <li
                key={index}
                style={{
                  padding: "8px",
                  borderBottom: "1px solid #ffcb05",
                }}
              >
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonDetail;
