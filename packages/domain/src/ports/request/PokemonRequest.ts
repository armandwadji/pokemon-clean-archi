export class PokemonRequest {
    hp: number;
    cp: number;
    name: string;
    picture: string;
    types: string[];
    created: Date;

    constructor(
        hp = 100,
        cp = 10,
        name = 'Nom',
        picture = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/123.png`,
        types: string[] = ['Normal'],
        created: Date = new Date(),
    ) {
        this.hp = hp;
        this.cp = cp;
        this.name = name;
        this.picture = picture;
        this.types = types;
        this.created = created;
    }
}