import * as React from "react";
import App from "./App";
import { store } from "@redux/GlobalReducer";
import { Provider } from "react-redux";

const AppWrapper: React.FC = () => {
  return (
    <div className="appWrapper">
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  );
};

export default AppWrapper;
