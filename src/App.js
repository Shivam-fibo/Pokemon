import './App.css'
import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import PokemonSearch from './PokemonSearch';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

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

  const handleShowSearch = () => setShowSearch(true);
  const handleShowList = () => setShowSearch(false);

  return (
    <div>
      <header>
      <h1>Pokémon Homepage</h1>
      </header>
      <button onClick={handleShowSearch} className="button-36" id='search'>Search Pokemon</button>
      <button onClick={handleShowList} className="button-36" id='list'>Go to Pokémon List</button>

      {showSearch ? (
        <PokemonSearch onSelectPokemon={handlePokemonClick} />
      ) : (
        <PokemonList pokemonList={pokemonList} onPokemonClick={handlePokemonClick} selectedPokemon={selectedPokemon} />
      )}
    </div>
  );
};

export default App;
