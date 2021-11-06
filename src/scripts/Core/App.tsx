import React from "react";
import HomePage from "../Main/HomePage/Home/Home";
import MoviesPage from "../Main/MoviesPage/MoviesPage/MoviesPage";
import MovieItemIndividual from "../Main/MoviePageIndividual/MovieItemIndividual/MovieItemIndividual";
import { HashRouter, Route, Switch } from "react-router-dom";
import Footer from "../Global/Footer/Footer";
import BuilderPage from "../Main/Builder/BuilderPage/BuilderPage";
import PricingPlansPage from "../Main/PricingPlansPage/PricingPlans/PricingPlans";
import CheckoutPage from "../Main/CheckoutPage/Checkout/CheckoutPage";
import ThankYouPage from "../Main/CheckoutPage/ThankYouPage/ThankYouPage";
import "./base.scss";
import "./global.scss";
import TestComponent from "../Main/Test/Test";
import MyProfile from "../Main/MembersArea/MyProfile/MyProfile";

const App: React.FC = () => {
  return (
    <div className="App">
      <HashRouter>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/movies/" component={MoviesPage}></Route>
          <Route
            exact
            path="/movies/:movieId"
            component={MovieItemIndividual}
          ></Route>
          <Route exact path="/builder" component={BuilderPage}></Route>
          <Route
            exact
            path="/pricing-plans"
            component={PricingPlansPage}
          ></Route>
          <Route exact path="/checkout" component={CheckoutPage}></Route>
          <Route
            exact
            path="/stripe-thank-you-page"
            component={ThankYouPage}
          ></Route>
          <Route exact path="/my-profile" component={MyProfile}></Route>
          <Route exact path="/test" component={TestComponent}></Route>
        </Switch>
      </HashRouter>
      <Footer />
    </div>
  );
};

export default App;
