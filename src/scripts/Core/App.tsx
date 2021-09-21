import React from 'react';
import HomePage from '../Main/HomePage/Home/Home';
import MoviesPage from '../Main/MoviesPage/MoviesPage/MoviesPage';
import MovieItemIndividual from '../Main/MoviePageIndividual/MovieItemIndividual/MovieItemIndividual';
import {HashRouter, Route, Switch} from "react-router-dom";
import Footer from '../Global/Footer/Footer';
import BuilderPage from '../Main/Builder/BuilderPage/BuilderPage';
import PricingPlansPage from '../Main/PricingPlansPage/PricingPlans/PricingPlans';
import CheckoutPage from '../Main/CheckoutPage/Checkout/CheckoutPage';
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
        <Route exact path="/pricing-plans" component={PricingPlansPage}></Route>
        <Route exact path="/checkout" component={CheckoutPage}></Route>
      </Switch>
      </HashRouter>
      <Footer />
    </div>
  );
}

export default App;
 