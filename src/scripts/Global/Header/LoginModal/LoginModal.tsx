import { setMemberStatus } from "@redux/UserReducers";
import React, { useState } from "react";
import {
  LoginModalProps,
  ModalStateProps,
  ErrorMessageProps,
} from "./LoginModalTypes";
import "./LoginModal.scss";
import {
  emailPasswordAuthenticationHandler,
  handleLoginClick,
} from "./LoginModalActions";
import { callDispatch } from "@redux/Actions";

const LoginModal: React.FC<LoginModalProps> = ({ setModalVisibility }) => {
  const [modalState, setModalState] =
    useState<ModalStateProps["modalState"]>("login");
  const [errorMessage, setErrorMessage] = useState<
    ErrorMessageProps["errorMessage"]
  >({ visible: false, code: "" });
  const dispatch = callDispatch();

  const modalStateHandler: () => void = () => {
    if (modalState === "login") {
      setModalState("signup");
    } else {
      setModalState("login");
    }
  };

  const handleUserSuccess: () => void = () => {
    dispatch(setMemberStatus(true));
    setErrorMessage({ visible: false, code: "" });
    setModalVisibility(false);
  };

  return (
    <div className="login-modal_wrapper">
      <div className="login-modal_container">
        <h1 className="login-modal_title" onClick={modalStateHandler}>
          {modalState === "login"
            ? "Click here to Sign Up"
            : "Click here to Log In"}
        </h1>
        <input
          type="email"
          className="login-form_email"
          id="login-form_email"
          onInput={(e) => setErrorMessage({ visible: false, code: "" })}
        />
        <input
          type="password"
          className="login-form_password"
          id="login-form_password"
          onInput={(e) => setErrorMessage({ visible: false, code: "" })}
        />
        {errorMessage.visible ? (
          <h5 className="login-modal_error-message" style={{ color: "red" }}>
            {errorMessage.code}
          </h5>
        ) : null}
        <button
          className="login-form_submit-btn"
          onClick={() =>
            emailPasswordAuthenticationHandler(
              modalState,
              handleUserSuccess,
              setErrorMessage
            )
          }
        >
          Submit
        </button>
        <hr
          style={{
            width: "300px",
            color: "rgba(109, 109, 109, 0.322)",
            margin: "30px 0",
          }}
        />
        <div className="login-modal_oauth_container">
          <button
            className="login-form_google-login"
            type="button"
            onClick={() =>
              handleLoginClick("google", setErrorMessage, handleUserSuccess)
            }
          >
            {modalState === "login"
              ? "Login with Google"
              : "Sign Up with Google"}
          </button>
          <button
            className="login-form_facebook-login"
            type="button"
            onClick={() =>
              handleLoginClick("facebook", setErrorMessage, handleUserSuccess)
            }
          >
            {modalState === "login"
              ? "Login with Facebook"
              : "Sign Up with Facebook"}
          </button>
        </div>
        <button
          className="login-modal_close-btn"
          onClick={() => setModalVisibility(false)}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
