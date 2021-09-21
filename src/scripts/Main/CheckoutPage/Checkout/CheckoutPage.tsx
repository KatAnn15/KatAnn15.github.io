import React, {useState, useContext, useEffect, useCallback} from 'react';
import { useLocation } from 'react-router';
import { GlobalContext } from 'src/scripts/Global/Context';

import {CountriesProps, PlanInfoProps} from "./Checkout.d";
import "./CheckoutPage.scss";

const CheckoutPage:React.FC = () => {
    const location: {state: {planInfo: string}} = useLocation();
    const context = useContext(GlobalContext);
    const [countries, setCountries] = useState<CountriesProps["countries"]>([]);
    const [planInfo, setPlanInfo] = useState<PlanInfoProps["planInfo"]>(null);

    const setPlanData = () => {
      let planData: PlanInfoProps["planInfo"] = planInfo;
      if (location.state) {
          planData = JSON.parse(location.state.planInfo)
      } else {
        const defaultPlanStr = window.localStorage.getItem("Prototype-defaultPlan");
        if (defaultPlanStr) {
          const defaultPlanObj = JSON.parse(defaultPlanStr);
          planData = defaultPlanObj
        }
      }
      setPlanInfo(planData)
    }

    const setCountriesList: () => void =  useCallback(async() => {
      const request = await fetch("https://restcountries.eu/rest/v2/all");
      const json: {name: string}[] = await request.json();
      const countriesList = json.map(item => item.name);
      setCountries(countriesList);
      setPlanData();
    }, [])
    useEffect(() => setCountriesList(), [setCountriesList])

    return (
        <div className="checkout-page_wrapper">
            <div className="checkout-form">
              <div className="user-details">  
                    <h3 className="checkout-title">Please, add your details below: </h3>
                    <input className="checkout-email" type="email" defaultValue={context.loggedIn&&context.email ? context.email : ""} placeholder="Enter your email"/>
                    <input className="checkout-name" type="text" defaultValue={context.loggedIn&&context.name ? context.name: ""} placeholder="Full name"/>
                    <select id="countries" name="countries">
                      {countries.map((country, i) => (<option value={country} key={i}>{country}</option>))}
                    </select>
                    <input className="checkout-country" type="text" placeholder="Address Line 2"/>             
                    <input type="text" className="checkout-zip" placeholder="ZIP Code"/>
                </div>
                <div className="payment-widget">
                </div>
              </div>
        </div>
    )
}

export default CheckoutPage