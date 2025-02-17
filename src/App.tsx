import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import PokemonColection from './components/PokemonColection';
import { Pokemon } from './interface';

interface Pokemons {
  name: string;
  url: string;
}

// interface Pokemon {
//   id: number;
//   name: string;
//   sprites: {
//     front_default: string;
//   }
// }

export interface Detail {
  id: number;
  isOpened: boolean;
}

const App:React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [nextUrl, setNextUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [viewDetail, setDetail] = useState<Detail>({
    id: 0,
    isOpened: false
  })

  useEffect(() => {
    const getPokemon = async() => {
      setLoading(true)
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20")
      // console.log('dataaaa: ', res.data)

      setNextUrl(res.data.next)
      res.data.results.forEach(async(pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        // console.log('poke:', poke)

        setPokemons((p) => [...p, poke.data])
      })

      setLoading(false)
    }

    getPokemon()
  },[])

  const nextPage = async() => {
    setLoading(true)
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20")
    // console.log('dataaaa: ', res.data)

    setNextUrl(res.data.next)
    res.data.results.forEach(async(pokemon: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      // console.log('poke:', poke)

      setPokemons((p) => [...p, poke.data])
    })

    setLoading(false)
  }
  // console.log('pokemons:', pokemons)
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">
          Pokemon
        </header>

        <PokemonColection pokemons={pokemons} viewDetail={viewDetail} setDetail={setDetail}/>

        <div className="btn">
          <button onClick={nextPage}>{loading ? 'Loading...' : 'Load more'}</button>
        </div>
      </div>
    </div>
  );
}

export default App;
