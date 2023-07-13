import React from "react";
import './App.css'
import {AppLayout} from "./shared/Layout/AppLayout";
import {PageLayout} from "./shared/PageLayout/PageLayout";

function App() {

  return (
      <AppLayout>
          <PageLayout title="Все заказы:"/>
      </AppLayout>
  )
}

export default App
