import React, {useState, useCallback, useEffect} from 'react';
import firebase from "../../../Global/firebase_setup";
import {PricingPlansProps, CurrentPlanProps, PlanProps} from "../PricingPlans";
import PricingPlanItem from '../PricingPlanItem/PricingPlanItem';
import { Link } from 'react-router-dom';
import "./PricingPlans.scss";

const features: {label: string, value: string, maxValue: number, sliderColor: string}[] = [
    {label: "Quality", value: "quality", maxValue: 5000, sliderColor: "linear-gradient(to right, fuchsia, orange)"},
    {label: "Resolution", value: "resolution", maxValue: 5000, sliderColor: "linear-gradient(to right, rgb(204, 102, 255), rgb(102, 102, 255))"},
    {label: "Devices", value: "devices", maxValue: 4, sliderColor: "linear-gradient(to right,rgb(0, 204, 153), rgb(0, 153, 153), rgb(0, 204, 255))"}
]

const PricingPlansPage: React.FC = () => {
    const [plans, setPlans] = useState<PricingPlansProps["plans"]>(null);
    const [currentPlan, setCurrentPlan] = useState<CurrentPlanProps["currentPlan"]>(null);
    const ref = firebase.firestore();

    const setPlansList: () => void = useCallback(async () => {
        const collection = await ref.collection("PricingPlans");
        const plansData: JSX.Element[] = [];
        collection.onSnapshot((data) => {
            data.forEach((snap) => {
                const itemData: PlanProps["plan"] = snap.data();
                plansData.push(<PricingPlanItem data={itemData} key={plansData.length} planData={{currentPlan: currentPlan, setCurrentPlan: setCurrentPlan}} plans={plans}/>)
            });
            setPlans(plansData);
        })
        if (currentPlan && plans) {
            const name = currentPlan.name;
            const sortedPlans = plans.sort((first, sec) => first.props.data.name === name ? -1 : sec.props.data.name === name ? 1 : 0)
            setPlans(sortedPlans);
        }        
    }, [ref, currentPlan])

    const setSlider: (value: number, max: number, sliderColor: string) => JSX.Element = (value, max, sliderColor) => {
        const sliderWidth = 250;
        const thumbPad = (value*100)/max;
        const thumbStyle = {
            paddingLeft: thumbPad + "%",
            background: sliderColor
        }
        return <div className="slider-element" key={value}>
            <div className="slider-body" style={{width: sliderWidth + "px"}}><span style={thumbStyle}></span></div>
        </div>
    }

    const setTechFeatures = () => {
        if (currentPlan)
        return features.map((feature, i) => {
            return (
                <div className="info-item-container" key={i}>
                    <p className="current-plan_feature-title">{feature["value"] === "devices" ? "Watch on your TV, computer, mobile phone and tablet" : feature["label"]}</p>
                    <div className="feature-wrapper">
                        <p className="feature-title">{currentPlan[feature["value"]].label}</p>
                        {feature.value === "devices" ? setSlider(feature.maxValue, feature.maxValue, feature.sliderColor): setSlider(currentPlan[feature["value"]].value, feature.maxValue, feature.sliderColor)}
                    </div>
                </div>
            )
        })
    }

    useEffect(() => setPlansList(), [setPlansList])
    
      return (
        <div className="pricing-plans_wrapper">
            <div className="plans_container">{plans}</div>  
            {currentPlan ? (
            <div className="current-plan-info">
                <p className="current-plan_title">{currentPlan?.title}</p>
                <div className="current-plan_tech-info">
                    {setTechFeatures()}
                </div>
                <Link to={{
                    pathname: "/checkout",
                    state: {planInfo: JSON.stringify(currentPlan)}
                }}>
                <button className="plan-checkout_btn">Checkout</button>
                </Link>
            </div>) : 
             null}       
        </div>
    )
}

export default PricingPlansPage