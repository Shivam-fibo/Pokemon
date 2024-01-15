import React, { useState, useEffect } from 'react';
import './App.css'

const PokemonSearch = ({ onBack, onSelectPokemon }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonSearch, setPokemonSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm) => setPokemonSearch(searchTerm);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonSearch.toLowerCase())
  );

  const handleClickPokemon = (url) => onSelectPokemon(url);

  return (
    <div>
      <h1 className = 'search'>Pokémon Search</h1>
    
      <div>
        <input type="text" placeholder="Search Pokémon" onChange={(e) => handleSearch(e.target.value)} />
      </div>
      <ul className="pokemon-list">
        {filteredPokemon.map((pokemon) => (
          <li key={pokemon.name} onClick={() => handleClickPokemon(pokemon.url)}>
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonSearch;
