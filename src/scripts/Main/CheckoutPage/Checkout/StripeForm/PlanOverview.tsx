import * as React from 'react';
import { StripeFormProps } from '../Checkout';
import { stripePubKey } from '../../../PricingPlansPage/PricingPlans';
import StripeCheckout from 'react-stripe-checkout';
import "./PlanOverview.scss";

const PlanOverview: React.FC<StripeFormProps> = ({planInfo}) => {
    const handleToken = () => {
      
    }
    
    return (
        <div className="checkout-plan_wrapper">
             <h3 className="checkout-plan_title">Plan overview: </h3>
            <div  className="">
                <div className="card-element_wrapper">
                     <StripeCheckout stripeKey={stripePubKey} token={handleToken}/>
                </div>
            </div>
        </div>
    )
}

export default PlanOverview