import React, {useCallback, useEffect} from 'react';
import { PricingPlanItemProps } from '../PricingPlans';
import Smoke from "@images/plans/smoke.png";
import "./PricingPlanItem.scss";
import { isMobile } from 'react-device-detect';

const PricingPlanItem:React.FC<PricingPlanItemProps> = ({data, planData, plans}) => {
    const {currentPlan, setCurrentPlan} = planData;
    const {color, name, price, title, baseColor} = data;
   
    const setPlanAsCurrent: () => void = () => {
        setCurrentPlan(data);
        window.localStorage.setItem("Prototype-defaultPlan", JSON.stringify(data))
    }

    const setPositions: () => number = useCallback(() => {
                let position: number = 0;
                plans?.forEach((plan, i)=> {
                    if (plan.props.data.name === data.name && !isMobile) {
                        switch (i) {
                            case 0:
                            return position = 0;
                            case 1:
                            return position = 300;
                            case 2:
                            return position = -300
                        }
                    } 
                })
                return position

    }, [plans, data])

    const itemStyle = {
        boxShadow: !currentPlan? "none": currentPlan?.name == name ? "0 0 5px white" : "none", 
        transform: isMobile? `translateY(${setPositions()}px)` :`translateX(${setPositions()}px)`,
        width: isMobile? "auto" : (!currentPlan ? "300px" : currentPlan?.name == name ? "340px" : "300px"),
        height: !currentPlan ? "360px" : currentPlan?.name == name ? "390px" : "360px",
        zIndex: !currentPlan ? 1 : currentPlan?.name == name ? 5 : 1,
        background: color
    }
    const smokeStyle = {
        opacity: !currentPlan? 0.6: currentPlan?.name == name ? 1 : 0.6
    }

     return (
        <div className="pricing-plan-item_wrapper"style={itemStyle}>
            {!currentPlan? 
                 null: 
                    currentPlan?.name !== data.name ? 
                        <div className="plan-overlay"></div> : 
                            null}
            <div className="plan-content_container" >
            <img src={Smoke} alt="overlay of smoke effect" className="overlay-smoke" style={smokeStyle}/>
                   <h4 className="plan-name">{name}</h4>
                    <h4 className="plan-price"><span>$</span>{price}</h4>
                    <h3 className="plan-title">{title}</h3>
            </div>  
            <button className={!currentPlan ? "view-toggle-btn inactive-plans-btn" : "view-toggle-btn"} onClick={setPlanAsCurrent} style={{background: `linear-gradient(35deg,${baseColor})`}}>
                {currentPlan?.name === name? <i className="fas fa-check"></i> : <i className="fas fa-plus"></i>}
            </button>
        </div>
    )
}

export default PricingPlanItem