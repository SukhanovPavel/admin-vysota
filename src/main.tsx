import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { TablePage } from "./pages/table";
import {store} from "../src/store/index";
import {Provider} from "react-redux";
// import {
//     createBrowserRouter,
//     RouterProvider,
// } from "react-router-dom";

import './index.css';

// import { Client } from 'appwrite';
// const client = new Client();
//
// client
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('6478a1b2d69ba277a3f8');
// import {TableCeilingsPage} from "./pages/tableCeilings";
// import {TableWindowsPage} from "./pages/tableWindows/page";
// import {TableBlindsPage} from "./pages/tableBlinds";
//
// const router = createBrowserRouter([
//     {
//         path: "/all",
//         element: <TablePage />,
//     },
//     {
//         path: "/windows",
//         element: <TableWindowsPage />
//     },
//     {
//         path: "/blinds",
//         element: <TableBlindsPage />
//     },
//     {
//         path: "/ceilings",
//         element: <TableCeilingsPage />
//     }
// ]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <React.StrictMode>
            {/*<RouterProvider router={router} />*/}
            <App />
        </React.StrictMode>
    </Provider>
)
