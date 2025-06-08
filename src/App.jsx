import { useState } from "react";
import AppRouters from "./Routers/AppRouters";
import { DataProvider } from "./Context/DataContext";
import "./App.css";

function App() {
  return (
    <>
      <DataProvider>
        <AppRouters />
      </DataProvider>
    </>
  );
}

export default App;
