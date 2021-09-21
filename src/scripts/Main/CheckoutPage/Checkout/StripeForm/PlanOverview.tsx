import React, {useState, useCallback, useEffect} from 'react';
import { StripeFormProps } from '../Checkout';
import { stripePubKey } from '../../../PricingPlansPage/PricingPlans.d';
import StripeCheckout from 'react-stripe-checkout';
import { PlanInfoProps} from ".././Checkout.d";
import "./PlanOverview.scss";

const PlanOverview: React.FC<StripeFormProps> = ({planInfo}) => {
    const [planData, setPlanData] = useState<PlanInfoProps["planInfo"]>(null);
    const checkoutPlanStyle = {
        background: planInfo?.color 
    }

    const handleToken = () => {
      
    }

    const setPlanInfo: () => void = useCallback(() => {
        if (planInfo) {
            setPlanData(planInfo)
        }
    },[planInfo])
    useEffect(() => setPlanInfo(), [setPlanInfo])
    
    return (
        <div className="checkout-plan_wrapper">
             <h3 className="checkout-plan_title">Plan overview: </h3>
            <div  className="checkout-plan_plan-info-wrapper">
                <div className="plan-details_container" style={checkoutPlanStyle}>
                    <h3 className="checkout_plan-name">{planData?.name}</h3>
                    <h3 className="checkout_plan-price"><span>$</span>{planData?.price}</h3>
                    <h3 className="checkout_plan-title">{planData?.title}</h3>
                </div>
                <div className="checkout-btn_wrapper">
                     <StripeCheckout stripeKey={stripePubKey} token={handleToken} amount={planData?.price}>
                         <button className="stripe-button_placeholder">Pay now</button>
                     </StripeCheckout>
                </div>
            </div>
        </div>
    )
}

export default PlanOverview