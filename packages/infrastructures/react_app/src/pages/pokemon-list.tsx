import {FunctionComponent} from "react";
import Loader from "../components/loader";
import PokemonCard from "../components/pokemon-card";
import {Link} from "react-router";
import PokemonSearch from "../components/pokemon-search";
import usePokemons from "../hooks/pokemonsHook";
import {Pokemon} from "@pokemon/domain";

const PokemonList: FunctionComponent = () => {

    const pokemons: Pokemon[] = usePokemons();

    return (
        <div className='container'>
            <div className='row'>
                <PokemonSearch/>
                {pokemons.length === 0
                    ? <h4 className='center'><Loader/></h4>
                    : pokemons.map((pokemon: Pokemon) => (<PokemonCard key={pokemon.id} pokemon={pokemon}/>))
                }
            </div>
            <Link
                className='btn-floating btn-large waves-effect waves-light red z-depth-3'
                style={{position: "fixed", bottom: "25px", right: "25px"}}
                to='/pokemons/add'>
                <i className='material-icons'>+</i>
            </Link>
        </div>
    );
}

export default PokemonList;