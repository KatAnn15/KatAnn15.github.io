import React from "react";
import { PlanProps } from "../../PricingPlansPage/PricingPlans";

export interface CountriesProps {
    countries:string[];
    setCountries: React.Dispatch<React.SetStateAction<string[]>>
}

export interface PlanOverviewProps {
    planInfo: (PlanProps["plan"] | null),
}

export interface PlanInfoProps {
    planInfo: StripeFormProps["planInfo"],
    setPlanInfo: React.Dispatch<React.SetStateAction<(PlanProps["plan"] | null)>>
}

//-----Card Element
//<StripeCheckout stripeKey={stripePubKey} token={handleToken} amount={planData?.price} email={emailField?.value}>
 //                        <button className="stripe-button_placeholder">Pay now</button>
//  </StripeCheckout>