import {TestBed} from '@angular/core/testing';
import {pokemonResolver} from './pokemon.resolver';
import {MaybeAsync, ResolveFn} from '@angular/router';
import {Pokemon} from '@pokemon/domain';
import {GetPokemonController} from '@pokemon/web-adapters';
import {NGXLogger} from 'ngx-logger';
import {of} from 'rxjs';

describe('pokemonResolver', () => {
  let mockController: jest.Mocked<GetPokemonController>;
  let mockLogger: jest.Mocked<NGXLogger>;

  const executeResolver: ResolveFn<MaybeAsync<Pokemon>> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => pokemonResolver(...resolverParameters));

  beforeEach(() => {
    mockController = {
      getPokemon: jest.fn().mockResolvedValue({
        pokemon: { id: '1', name: 'Pikachu' } as Pokemon
      })
    } as any;

    mockLogger = {
      error: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      providers: [
        { provide: NGXLogger, useValue: mockLogger },
        { provide: GetPokemonController, useValue: mockController },
      ]
    });
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should get pokemon by id', () => {
    const activatedRouteSnapshot = {
      paramMap: new Map([['id', '1']])
    } as any;
    const stateSnapshotMock = {} as any;

    of(executeResolver(activatedRouteSnapshot, stateSnapshotMock)).subscribe((pokemon) => {
      expect(mockController.getPokemon).toHaveBeenCalledWith('1');
      expect(pokemon).toContainEqual({name: 'Pikachu'});
    });
  });

  it('should throw error if id is empty', async () => {
    const activatedRouteSnapshot = {
      paramMap: new Map([])
    } as any;
    const stateSnapshotMock = {} as any;

    await expect(async () => {
      await executeResolver(activatedRouteSnapshot, stateSnapshotMock);
    }).rejects.toThrow('Pokemon ID is required for the resolver');
    expect(mockLogger.error).toHaveBeenCalledWith('Pokemon ID is required for the resolver');
  });
});

