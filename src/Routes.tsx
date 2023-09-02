import React from "react";
import { Route, BrowserRouter, Routes as Routing } from "react-router-dom";

import { Result, Search, MyDecks, OpenDeck } from "./pages";

const Routes = () => {
  return(
      <BrowserRouter>
          <Routing>
            <Route Component = { Search }  path="/" />
            <Route Component = { Result }  path="/results" />
            <Route Component = { MyDecks }  path="/mydecks" />
            <Route Component = { OpenDeck }  path="/opendeck" />
          </Routing>
      </BrowserRouter>
  )
}

export default Routes