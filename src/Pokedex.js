import React, {useState, useEffect} from "react";

fuction renderToReadableStream(){
    const [pokemons,setPokemons]=useState([]);
    const [loading, setLoading]=useState(true);
    const [error,setError]=useState(null);

    //usar useEfect para hacer la peticion cuando el componente se monte
    useEffect(()=>{
        const fetchPokemons=async ()=>{
            try{
                setLoading(true);
                const response=await fetch(
                    "https://pokeapi.co/api/v2/pokemon?limit=100"
                );
                if (!response.ok){
                    throw new Error("Error al cargar los Pokémons");
                }
                const data=await response.json();
                setPokemons(data.results);
                setLoading(false);
            }catch (err){
                setError(err.message);
                setLoading(false);
            }
        };
        fetchPokemons();
    },[]);// El array vacio significa que se ejecuta solo una vez al montar
    if (loading) return <div>Cargando Pokémon...</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Lista de Pokemons</h1>
            <ul>
                {pokemons.app((pokemon, index)=> (
                    <li key={index}>{pokemon.name}</li>
                ))}
            </ul>
        </div>
    )
}