import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {store} from "../src/store/index";
import {Provider} from "react-redux";

import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {TablePage} from "./pages/table";
import {HomePage} from "./pages/home/homePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/all",
        element: <TablePage />,
    },
    // {
    //     path: "/windows",
    //     element: <TableWindowsPage />
    // },
    // {
    //     path: "/blinds",
    //     element: <TableBlindsPage />
    // },
    // {
    //     path: "/ceilings",
    //     element: <TableCeilingsPage />
    // }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router}><App /></RouterProvider>
        </React.StrictMode>
    </Provider>
)
