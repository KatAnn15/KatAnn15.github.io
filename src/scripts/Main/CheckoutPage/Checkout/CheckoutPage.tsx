import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router";
import PlanOverview from "./PlanOverview/PlanOverview";
import { PlanInfoProps } from "./Checkout.d";
import {
  getSelectorWithStatus,
  getSelector,
  callDispatch,
} from "@redux/Actions";
import "./CheckoutPage.scss";
import { getCountries, postCheckout } from "@redux/AsyncThunks/AsyncThunks";

const CheckoutPage: React.FC = () => {
  const location: { state: { planInfo: string } } = useLocation();
  const [planInfo, setPlanInfo] = useState<PlanInfoProps["planInfo"]>(null);
  const loggedIn = getSelector("membersStatus");
  const dispatch = callDispatch();
  const email = getSelector("email");
  const name = getSelector("name");
  const countries = getSelectorWithStatus("countries");

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
    const formData: FormData = new FormData(form);
    formData.append("price", planInfo ? planInfo.price.toString() : "");
    formData.append("plan", planInfo ? planInfo.title.toString() : "");
    dispatch(postCheckout(formData)).then((data) =>
      window.open(data.payload.url, "_blank")
    );
  };

  const setCountriesList: () => void = useCallback(async () => {
    setPlanData();
    dispatch(getCountries());
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
              {countries.status === "fulfilled" ? (
                Object.keys(countries.value.data).map((key, i) => (
                  <option value={countries.value.data[key].country} key={i}>
                    {countries.value.data[key].country}
                  </option>
                ))
              ) : (
                <option value="loading">Loading...</option>
              )}
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
          <PlanOverview />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
