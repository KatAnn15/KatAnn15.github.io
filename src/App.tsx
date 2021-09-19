import React from 'react';
import HomePage from './scripts/Main/HomePage/Home/Home';
import MoviesPage from './scripts/Main/MoviesPage/MoviesPage/MoviesPage';
import MovieItemIndividual from './scripts/Main/MoviePageIndividual/MovieItemIndividual/MovieItemIndividual';
import {HashRouter, Route, Switch} from "react-router-dom";
import Footer from './scripts/Global/Footer/Footer';
import BuilderPage from './scripts/Main/Builder/BuilderPage/BuilderPage';
import "./base.scss";
import "./global.scss";

const App: React.FC  = () => {
  return (
    <div className="App">
      <HashRouter>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/movies/" component={MoviesPage}></Route>
        <Route exact path="/movies/:movieId" component={MovieItemIndividual}></Route>
        <Route exact path="/builder" component={BuilderPage}></Route>
      </Switch>
      </HashRouter>
      <Footer />
    </div>
  );
}

export default App;
 