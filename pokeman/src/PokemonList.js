import React, { useState, useEffect } from 'react';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePokemonClick = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  return (
    <div>
      {selectedPokemon ? (
        <div className='box'>
          <h2>Details for {selectedPokemon.name}</h2>
          <p>Abilities: {selectedPokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
          <p>Types: {selectedPokemon.types.map((type) => type.type.name).join(', ')}</p>
          <p>Base Experience: {selectedPokemon.base_experience}</p>
          <button className='button-33' onClick={() => setSelectedPokemon(null)}>Go Back to List</button>
        </div>
      ) : (
        <div className="pokemon-container">
        <h2 className='search'>Pokémon List</h2>
        <ul className="pokemon-list">
          {pokemonList.map((pokemon) => (
            <li key={pokemon.name} className="pokemon-card" onClick={() => handlePokemonClick(pokemon.url)}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)}.png`}
                alt={pokemon.name}
              />
              <p>{pokemon.name}</p>
            </li>
          ))}
        </ul>
      </div>
      
      )}
    </div>
  );
};

export default PokemonList;
