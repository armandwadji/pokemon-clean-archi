export const routesName = {
    error: { path: 'error', title: 'Error' },
    login: { path: 'login', title: 'Login' },
    pokemon: {
        path: 'pokemons',
        title: 'Pokemon',
        children: {
            list: {
                path: '',
                title: 'liste des pokémons',
                fullPath: 'pokemons',
            },
            add: {
                path: 'add',
                title: 'ajouter un pokémon',
                fullPath: 'pokemons/add',
            },
            detail: {
                path: 'detail',
                title: 'Detail',
                fullPath: 'pokemons/detail',
            },
            editing: {
                path: 'editer',
                title: 'Editer',
                fullPath: 'pokemons/edit',
            },
        },
    },
};