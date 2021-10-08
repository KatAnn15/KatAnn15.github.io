import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router";
import PlanOverview from "./PlanOverview/PlanOverview";
import { CountriesProps, PlanInfoProps } from "./Checkout.d";
import { getSelector } from "@redux/Actions";
import "./CheckoutPage.scss";

const CheckoutPage: React.FC = () => {
  const location: { state: { planInfo: string } } = useLocation();
  const [countries, setCountries] = useState<CountriesProps["countries"]>([]);
  const [planInfo, setPlanInfo] = useState<PlanInfoProps["planInfo"]>(null);
  const loggedIn = getSelector("membersStatus");
  const email = getSelector("email");
  const name = getSelector("name");

  const setPlanData = () => {
    let planData: PlanInfoProps["planInfo"] = planInfo;
    if (location.state) {
      planData = JSON.parse(location.state.planInfo);
    } else {
      const defaultPlanStr = window.localStorage.getItem(
        "Prototype-defaultPlan"
      );
      if (defaultPlanStr) {
        const defaultPlanObj = JSON.parse(defaultPlanStr);
        planData = defaultPlanObj;
      }
    }
    setPlanInfo(planData);
  };

  const submitData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("price", planInfo ? planInfo.price.toString() : "");
    formData.append("plan", planInfo ? planInfo.title.toString() : "");
    fetch("https://" + window.location.hostname + "/create-checkout-session", {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => window.open(data.url, "_blank"));
  };

  const setCountriesList: () => void = useCallback(async () => {
    setPlanData();
    const request = await fetch(
      "https://" + window.location.hostname + "/countries"
    );
    const json: { data: { country: string }[] } = await request.json();
    const data = json.data;
    const keys = Object.keys(data);
    const countriesList = keys.map((key) => data[key].country);
    setCountries(countriesList);
  }, []);
  useEffect(() => setCountriesList(), [setCountriesList]);

  return (
    <div className="checkout-page_wrapper">
      <div className="checkout-form">
        <div className="user-details">
          <h3 className="checkout-title">Please, add your details below: </h3>
          <form onSubmit={submitData} className="stripe-form">
            <input
              className="checkout-email"
              name="email"
              id="checkout-email"
              type="email"
              defaultValue={loggedIn && email ? email : ""}
              placeholder="Enter your email"
            />
            <input
              className="checkout-name"
              name="name"
              type="text"
              defaultValue={loggedIn && name ? name : ""}
              placeholder="Full name"
            />
            <select id="countries" name="countries">
              {countries.map((country, i) => (
                <option value={country} key={i}>
                  {country}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="zip"
              className="checkout-zip"
              placeholder="ZIP Code"
            />
            <button className="checkout-btn" type="submit">
              Pay Now
            </button>
          </form>
        </div>
        <div className="payment-widget">
          <PlanOverview planInfo={planInfo} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
