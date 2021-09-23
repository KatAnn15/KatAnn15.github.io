import React, {useState, useCallback, useEffect} from 'react';
import { PlanOverviewProps } from '../Checkout';
import { PlanInfoProps} from "../Checkout";
import SliderChart from 'src/scripts/Main/Utils/SliderChart/SliderChart';
import "./PlanOverview.scss";
import { features } from '../../../Utils/SliderChart/ChartConsts';

let emailField;

const PlanOverview: React.FC<PlanOverviewProps> = ({planInfo}) => {
    const [planData, setPlanData] = useState<PlanInfoProps["planInfo"]>(null);
    const checkoutPlanStyle = {
        background: planInfo?.color 
    }   

    const setPlanFeatures = () => {
        if (planData) {
            return features.map((feature, i) => 
                <SliderChart feature={feature} currentPlan={planData} sliderWidth={150} mode="short" key={"ftr" + i}/>
            )
        }
    }
    
    const setPlanInfo: () => void = useCallback(() => {
        emailField = document.getElementById("checkout-email") as HTMLInputElement;
        if (planInfo) {
            setPlanData(planInfo)
        }
    },[planInfo, emailField])
    useEffect(() => setPlanInfo(), [setPlanInfo])
    
    return (
        <div className="checkout-plan_wrapper">
             <h3 className="checkout-plan_title">Plan overview: </h3>
            <div  className="checkout-plan_plan-info-wrapper">
                <div className="plan-details_container" style={checkoutPlanStyle}>
                    <h3 className="checkout_plan-name">{planData?.name}</h3>
                    <h3 className="checkout_plan-price"><span>$</span>{planData?.price}</h3>
                    <h3 className="checkout_plan-title">{planData?.title}</h3>
                    <div className="plans-tech-fetaures_container">
                    {setPlanFeatures()}
                </div>
                </div>
            </div>
        </div>
    )
}

export default PlanOverview