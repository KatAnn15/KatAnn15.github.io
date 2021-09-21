import React from "react";
import { PlanProps } from "../../PricingPlansPage/PricingPlans";

export interface CountriesProps {
    countries:string[];
    setCountries: React.Dispatch<React.SetStateAction<string[]>>
}

export interface StripeFormProps {
    planInfo: (PlanProps["plan"] | null),
}

export interface PlanInfoProps {
    planInfo: StripeFormProps["planInfo"],
    setPlanInfo: React.Dispatch<React.SetStateAction<(PlanProps["plan"] | null)>>
}
