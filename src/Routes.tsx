import React from "react";
import { Route, BrowserRouter, Routes as Routing } from "react-router-dom";

import { Result, Search } from "./pages";

const Routes = () => {
  return(
      <BrowserRouter>
          <Routing>
            <Route Component = { Search }  path="/" />
            <Route Component = { Result }  path="/results" />
          </Routing>
      </BrowserRouter>
  )
}

export default Routes