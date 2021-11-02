import React, { useEffect } from "react";
import { getPlans } from "@redux/AsyncThunks/AsyncThunks";
import { useDispatch } from "react-redux";
import { getSelector } from "@redux/Actions";

const TestComponent: React.FC = () => {
  const dispatch = useDispatch();
  const plans = getSelector("allPlans");
  const plan = getSelector("plan");
  useEffect(() => {
    dispatch(getPlans());
  }, [getPlans]);
  return (
    <div className="test">
      <p>{JSON.stringify(plan)}</p>
    </div>
  );
};

export default TestComponent;
