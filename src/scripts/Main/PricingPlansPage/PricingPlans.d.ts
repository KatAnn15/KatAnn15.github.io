import React from "react";

export interface PricingPlansProps {
  plans: null | JSX.Element[];
  setPlans: React.Dispatch<React.SetStateAction<null | JSX.Element[]>>;
}

export interface PlanProps {
  plan: {
    title: string;
    price: number;
    quality: { label: string; value: number };
    resolution: { label: string; value: number };
    devices: Boolean;
    isPrimary: Boolean;
    name: string;
    color: string;
    baseColor: string;
  };
}

export interface CurrentPlanProps {
  currentPlan: null | PlanProps["plan"];
  setCurrentPlan: React.Dispatch<
    React.SetStateAction<null | PlanProps["plan"]>
  >;
}

export interface PricingPlanItemProps {
  data: PlanProps["plan"];
  plans: PricingPlansProps["plans"];
}

export interface PricingItemCardProps {
  Smoke;
  smokeStyle;
  name: string;
  price: number;
  title: string;
}

export const stripeSecretKey =
  "sk_test_51JcASVF2J19ETIqFPiHxTkPrR6De6I6Eme95gjz86xKW3ZoluUOpgwyi1xuoTzOSU5J1eT7Xmdrh2FVQZ8yevWSP008AcItihp";
export const stripePubKey =
  "pk_test_51JcASVF2J19ETIqFriPTop9QJAwYXg43FPKldcijsowDk9zzpQoT2cmwnESeMSlNQrZzp4BrWdBiBsAZP2FmEldV00WC3oN9e4";
