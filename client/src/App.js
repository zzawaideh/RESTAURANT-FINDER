import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

//IMPORT ROUTES
import Home from "./Home";
import UpdatePage from "./UpdatePage";
import RestaurantDetailPage from "./RestaurantDetailPage";

function App() {
  return (
    <Fragment>
      <Router>
          <div className="container" >
              <Routes>

                <Route exact path="/" element={<Home />} />

                <Route exact path="/restaurants/:id" element={<RestaurantDetailPage />} />

                <Route exact path="/restaurants/:id/update" element={<UpdatePage />} />

                

              </Routes>
          </div>
        </Router>
    </Fragment>
  );
}

export default App;
