import * as React from 'react';
import { SliderChartProps } from './SliderChart.d';
import "./SliderChart.scss";

const SliderChart:React.FC<SliderChartProps> = ({currentPlan, feature, sliderWidth, mode}) => {
      
    const setSlider: (value: number, max: number, sliderColor: string) => JSX.Element = (value, max, sliderColor) => {
        const thumbPad = (value*100)/max;
        const thumbStyle = {
            paddingLeft: thumbPad + "%",
            background: sliderColor
        }
        return (
            <div className="plan-chart_wrapper">
                <div className="slider-element" key={value}>
                <div className="slider-body" style={{width: sliderWidth + "px"}}><span style={thumbStyle}></span></div>
            </div>
            </div>
        )
}

return (
    <div className="feature-wrapper">
        {mode ==="full" ?<p className="feature-title">{currentPlan[feature["value"]].label}</p>: <p className="feature-title">{feature["label"]}</p>}
        {feature.value === "devices" ? setSlider(feature.maxValue, feature.maxValue, feature.sliderColor): setSlider(currentPlan[feature["value"]].value, feature.maxValue, feature.sliderColor)}
    </div>
)
}

export default SliderChart