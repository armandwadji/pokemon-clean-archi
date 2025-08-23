import React, {JSX} from 'react';
import PokemonList from "./pages/pokemon-list";
import {Route, Routes} from "react-router";
import PokemonsDetail from "./pages/pokemon-detail";
import PokemonEdit from "./pages/pokemon-edit";
import PokemonAdd from "./pages/pokemon-add";
import {routesName} from "./utils/routing.config";
import PageTitleWrapper from "./pages/page-title-wrapper";
import PageNotFound from "./pages/page-not-found";

interface AppProps {
    path: string;
    element: JSX.Element;
}

function App() {
    const appRoutes: AppProps[] = [
        {
            path: `/`,
            element: <PageTitleWrapper title={routesName.pokemon.children.list.title}><PokemonList/></PageTitleWrapper>
        },
        {
            path: `/${routesName.pokemon.path}`,
            element: <PageTitleWrapper title={routesName.pokemon.children.list.title}><PokemonList/></PageTitleWrapper>
        },
        {
            path: `/${routesName.pokemon.children.detail.fullPath}/:id`,
            element: <PageTitleWrapper title={routesName.pokemon.children.detail.title}><PokemonsDetail/></PageTitleWrapper>
        },
        {
            path: `/${routesName.pokemon.children.editing.fullPath}/:id`,
            element: <PageTitleWrapper title={routesName.pokemon.children.editing.title}><PokemonEdit/></PageTitleWrapper>
        },
        {
            path: `/${routesName.pokemon.children.add.fullPath}`,
            element: <PageTitleWrapper title={routesName.pokemon.children.add.title}><PokemonAdd/></PageTitleWrapper>
        },
    ];

    return (
        <Routes>
            {appRoutes.map((route: AppProps) => (
                <Route key={route.path} path={route.path} element={route.element}/>
            ))}
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    );
}

export default App;
