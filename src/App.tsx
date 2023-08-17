import React from "react";
import {AppLayout} from "./shared/Layout/AppLayout";
import {PageLayout} from "./shared/PageLayout/PageLayout";

import './App.css';

function App() {

    return (
        <AppLayout>
            <PageLayout title="Все заказы:"/>
        </AppLayout>
    )
}

export default App;