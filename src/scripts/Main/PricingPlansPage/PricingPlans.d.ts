import React from "react";

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
  plansLoc: {
    plansLocal: any[] | null;
    setPlansLocal: React.Dispatch<React.SetStateAction<any[] | null>>;
  };
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
