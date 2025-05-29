import {TestBed} from '@angular/core/testing';
import {pokemonResolver} from './pokemon.resolver';
import {MaybeAsync, ResolveFn} from '@angular/router';
import {Pokemon} from '@pokemon/domain';
import {GetPokemonController} from '@pokemon/web-adapters';

describe('pokemonResolver', () => {
  let mockController: jest.Mocked<GetPokemonController>;

  const executeResolver: ResolveFn<MaybeAsync<Pokemon>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => pokemonResolver(...resolverParameters));

  beforeEach(() => {
    mockController = {
      getPokemon: jest.fn().mockResolvedValue({
        pokemon: { id: '1', name: 'Pikachu' } as Pokemon
      })
    } as any;

    TestBed.configureTestingModule({
      providers: [
        { provide: GetPokemonController, useValue: mockController }
      ]
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

