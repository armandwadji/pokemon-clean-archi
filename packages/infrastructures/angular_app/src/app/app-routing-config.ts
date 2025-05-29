export const routesName = {
  error: { path: 'error', title: 'Error' },
  login: { path: 'login', title: 'Login' },
  pokemon: {
    path: 'pokemon',
    title: 'Pokemon',
    children: {
      list: {
        path: '',
        title: 'liste des pokémons',
        fullPath: 'pokemon',
      },
      add: {
        path: 'ajout',
        title: 'ajouter un pokémon',
        fullPath: 'pokemon/ajout',
      },
      detail: {
        path: 'detail',
        title: 'Detail',
        fullPath: 'pokemon/detail',
      },
      editing: {
        path: 'editer',
        title: 'Editer',
        fullPath: 'pokemon/editer',
      },
    },
  },
};
