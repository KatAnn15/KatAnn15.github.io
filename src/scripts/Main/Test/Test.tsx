import React, { useEffect } from "react";
import { getPlans } from "@redux/AsyncThunks/AsyncThunks";
import { useDispatch } from "react-redux";
import { getSelector } from "@redux/Actions";
import { getFirestoreData } from "@firebaseMy/firebase_actions";

const TestComponent: React.FC = () => {
  const dispatch = useDispatch();
  const plans = getSelector("allPlans");
  const plan = getSelector("plan");
  useEffect(() => {
    getFirestoreData("WatchedMovies").then((resp) => console.log(resp));
  }, [getPlans]);
  return (
    <div className="test">
      <p>{JSON.stringify(plan)}</p>
    </div>
  );
};

export default TestComponent;
