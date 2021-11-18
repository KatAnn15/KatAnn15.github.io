import * as React from "react";
import App from "./App";
import { store } from "@redux/GlobalReducer";
import { Provider } from "react-redux";

const AppWrapper: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
