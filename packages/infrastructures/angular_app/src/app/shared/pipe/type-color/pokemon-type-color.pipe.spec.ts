import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';

describe('PokemonTypeColorPipe', () => {
  let pipe: PokemonTypeColorPipe;

  beforeEach(() => {
    pipe = new PokemonTypeColorPipe();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it.each([
    { type: 'Feu', expected: 'red lighten-1' },
    { type: 'Eau', expected: 'blue lighten-1' },
    { type: 'Plante', expected: 'green lighten-1' },
    { type: 'Insecte', expected: 'brown lighten-1' },
    { type: 'Normal', expected: 'grey lighten-3' },
    { type: 'Vol', expected: 'blue lighten-3' },
    { type: 'Poison', expected: 'deep-purple accent-1' },
    { type: 'Fée', expected: 'pink lighten-4' },
    { type: 'Psy', expected: 'deep-purple darken-2' },
    { type: 'Electrik', expected: 'lime accent-1' },
    { type: 'Combat', expected: 'deep-orange' },
    { type: 'Inconnu', expected: 'grey' },
    { type: null, expected: 'grey' },
    { type: undefined, expected: 'grey' },
  ])(
    'should return for type $type correct color $expected',
    ({ type, expected }) => {
      expect(pipe.transform(type as string)).toBe(`chip ${expected}`);
    },
  );
});
