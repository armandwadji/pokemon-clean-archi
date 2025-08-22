import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router";
import {DataProvider} from "./context/DataProviderContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <DataProvider>
            <App/>
        </DataProvider>
    </BrowserRouter>
);

reportWebVitals();
