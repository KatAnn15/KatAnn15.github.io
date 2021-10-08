export interface ModalStateProps {
  modalState: "login" | "signup";
  setModalState: React.Dispatch<React.SetStateAction<"login" | "signup">>;
}

export interface ErrorMessageProps {
  errorMessage: {
    visible: Boolean;
    code: string;
  };
  setErrorMessage: React.Dispatch<
    React.SetStateAction<{
      visible: Boolean;
      code: string;
    }>
  >;
}

export interface LoginModalProps {
  setModalVisibility: React.Dispatch<React.SetStateAction<Boolean>>;
}
