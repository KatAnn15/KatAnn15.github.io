import React, { useEffect, useCallback } from "react";
import PlanOverview from "./PlanOverview/PlanOverview";
import {
  getSelectorWithStatus,
  getSelector,
  callDispatch,
} from "@redux/Actions";
import "./CheckoutPage.scss";
import {
  getCountries,
  postCheckout,
  getPlans,
  setFirestoreData,
} from "@redux/AsyncThunks/AsyncThunks";
import { setProfileCat } from "@redux/StateReducers";
import { getAuth } from "firebase/auth";
import { setMemberStatus, setSubscribedStatus } from "@redux/UserReducers";
import { PlanProps } from "../../PricingPlansPage/PricingPlans";

const CheckoutPage: React.FC = () => {
  const loggedIn = getSelector("membersStatus");
  const dispatch = callDispatch();
  const countries = getSelectorWithStatus("countries");
  const user = getSelector("user");
  const plan = getSelector("plan");
  const activities = getSelector("profileActivities");

  const submitData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData: FormData = new FormData(form);
    formData.append("price", plan ? plan.price.toString() : "");
    formData.append("plan", plan ? plan.title.toString() : "");
    dispatch(postCheckout(formData)).then((data) => {
      if (data.payload) {
        data.payload ? window.open(data.payload.url, "_blank") : null;
        submitPlanToDb();
      }
    });
  };

  const submitPlanToDb = () => {
    const currentPlans = activities["Plans"][0];
    let newPlans: PlanProps["plan"][] = [];
    if (currentPlans) {
      newPlans = [...currentPlans.plans];
    }
    newPlans = newPlans.concat([plan]);
    dispatch(
      setFirestoreData({
        uid: user.uid,
        collection: "Plans",
        files: { plans: newPlans },
      })
    )
      .then(() => dispatch(setProfileCat("Plans")))
      .then(() => dispatch(setSubscribedStatus(true)));
  };

  const setCountriesList: () => void = useCallback(async () => {
    if (!user) {
      const auth = getAuth();
      auth.onAuthStateChanged(() => {
        if (auth.currentUser) {
          dispatch(setMemberStatus(true));
          dispatch(setProfileCat("Plans"));
        } else {
          dispatch(setMemberStatus(false));
        }
      });
    }
    dispatch(getPlans());
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
              defaultValue={loggedIn && user?.email ? user.email : ""}
              placeholder="Enter your email"
            />
            <input
              className="checkout-name"
              name="name"
              type="text"
              defaultValue={
                loggedIn && user?.displayName ? user.displayName : ""
              }
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
          <button onClick={submitPlanToDb}>Test Plan Submission</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
