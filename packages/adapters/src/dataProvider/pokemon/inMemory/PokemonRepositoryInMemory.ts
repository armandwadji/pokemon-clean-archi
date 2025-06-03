import {Pokemon} from "@pokemon/domain/src/entities/Pokemon";
import {POKEMONS} from "../../../../fixtures/mock-pokemon-list";
import {IPokemonDataProviderBoundary, PokemonRequest} from "@pokemon/domain";
import {DataProvider} from "../../DataProvider";
import {DataProviderCode, Version} from "../../IDataprovider";
import {RegisterPokemonDataProvider} from "../IPokemonDataProvider";


@RegisterPokemonDataProvider
export class PokemonRepositoryInMemory extends DataProvider implements IPokemonDataProviderBoundary{
    private pokemons: Pokemon[];

    constructor() {
        super(Version.V1, DataProviderCode.AUTH);
        this.pokemons = POKEMONS
    }

    getPokemons(): Promise<Pokemon[]> {
        return Promise.resolve(this.pokemons);
    }

    getPokemon(id: string): Promise<Pokemon> {
        return new Promise((resolve, reject)=>{
            const pokemonResolved: Pokemon | undefined = this.pokemons.find((p:Pokemon) => p.id == id);
            if (pokemonResolved) {
                return resolve(pokemonResolved);
            } else {
                reject(new Error(`pokemon by id ${id} doesn't exist in this repository`));
            }
        })
    }

    addPokemon(pokemon: PokemonRequest): Promise<Pokemon> {
        return new Promise(resolve => {
            const pokemonToAdd: Pokemon = {
                id: new Date().getTime().toString(),
                hp: pokemon.hp,
                cp: pokemon.cp,
                name: pokemon.name,
                picture: pokemon.picture,
                types: pokemon.types,
                created:new Date(),
            }
            this.pokemons.push(pokemonToAdd);
            return resolve(pokemonToAdd);
        })
    }

    updatePokemon( id:string, pokemonRequest: PokemonRequest): Promise<Pokemon> {
        const index  = this.pokemons.findIndex((p: Pokemon) => p.id === id);
        if (index !== -1) {
            const pokemonToUpdate: Pokemon = this.pokemons[index];
            pokemonToUpdate.hp = pokemonRequest.hp;
            pokemonToUpdate.cp = pokemonRequest.cp;
            pokemonToUpdate.name = pokemonRequest.name;
            pokemonToUpdate.picture = pokemonRequest.picture;
            pokemonToUpdate.types = pokemonRequest.types;
            this.pokemons[index] = pokemonToUpdate;
            return Promise.resolve(pokemonToUpdate);
        } else {
            throw new Error(`${id} doesn't exist in this repository`);
        }
    }

    deletePokemon(id: string): Promise<void> {
        return new Promise(resolve => {
            this.pokemons = this.pokemons.filter((pokemon: Pokemon) => pokemon.id !== id);
            resolve();
        });
    }

    searchPokemonByName(search: string): Promise<Pokemon[] | undefined> {
        if (search.length <= 1) {
            return Promise.resolve(undefined);
        }
        return Promise.resolve(
            this.pokemons.filter((pokemon: Pokemon) =>
                pokemon.name.toLowerCase().includes(search.toLowerCase()),
            ),
        );
    }
}