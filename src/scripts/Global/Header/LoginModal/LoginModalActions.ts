import {
  auth,
  googleAuthProvider,
  facebookAuthProvider,
} from "../../Firebase/firebase_setup";

export const emailPasswordAuthenticationHandler: (
  modalState: string,
  handleUserSuccess,
  setErrorMessage
) => void = async (modalState, handleUserSuccess, setErrorMessage) => {
  const emailField = document.getElementById("login-form_email")!;
  const passwordField = document.getElementById("login-form_password")!;
  if (modalState === "signup") {
    try {
      const newMember = await auth.createUserWithEmailAndPassword(
        (emailField as HTMLInputElement).value,
        (passwordField as HTMLInputElement).value
      );
      if (newMember.user && newMember.user.email) {
        handleUserSuccess(
          newMember.user.email,
          newMember.user.email.split("@")[0]
        );
      }
    } catch (err) {
      setErrorMessage({ visible: true, code: "" + err });
    }
  } else {
    try {
      const loggedInMember = await auth.signInWithEmailAndPassword(
        (emailField as HTMLInputElement).value,
        (passwordField as HTMLInputElement).value
      );
      if (loggedInMember.user && loggedInMember.user.email)
        handleUserSuccess(
          loggedInMember.user.email,
          loggedInMember.user.email.split("@")[0]
        );
    } catch (err) {
      setErrorMessage({ visible: true, code: "" + err });
    }
  }
};

export const handleLoginClick: (
  provider: string,
  setErrorMessage,
  handleUserSuccess
) => void = async (provider, setErrorMessage, handleUserSuccess) => {
  if (provider === "google") {
    signInUser(googleAuthProvider, handleUserSuccess, setErrorMessage);
  } else {
    signInUser(facebookAuthProvider, handleUserSuccess, setErrorMessage);
  }
};

async function signInUser(provider, handleUserSuccess, setErrorMessage) {
  try {
    const resp = await auth.signInWithPopup(provider);
    if (resp.user && resp.user.email && resp.user.displayName) {
      handleUserSuccess(resp.user.email, resp.user.displayName);
    }
  } catch (err) {
    setErrorMessage({ visible: true, code: "Error here: " + err });
  }
}
