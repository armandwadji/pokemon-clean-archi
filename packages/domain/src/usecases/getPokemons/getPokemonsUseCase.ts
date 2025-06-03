import {IPokemonDataProviderBoundary} from "../../ports/dataprovider/IPokemonDataProviderBoundary";
import {UseCase} from "../UseCase";
import {
    IGetPokemonsEntryPointBoundary,
    InputGetPokemonsValues,
    OutputGetPokemonsValues
} from "../../ports/boundary/IGetPokemonsEntryPointBoundary";
import {Builder} from "builder-pattern";
import {Pokemon} from "../../entities/Pokemon";

export class GetPokemonsUseCase extends UseCase<InputGetPokemonsValues, OutputGetPokemonsValues> implements IGetPokemonsEntryPointBoundary {

    constructor(private pokemonRepository : IPokemonDataProviderBoundary) {
        super();
    }
    
    override async execute(input: InputGetPokemonsValues): Promise<OutputGetPokemonsValues>  {
        return await this.pokemonRepository.getPokemons()
            .then((pokemons: Pokemon[]) => Builder<OutputGetPokemonsValues>().pokemons(pokemons).build());
    }
}