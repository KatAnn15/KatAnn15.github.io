export interface MembersBarProps {
  setModalVisibility: React.Dispatch<React.SetStateAction<Boolean>>;
}

export interface LoginDisplayProps {
  mLoginDisplay: "none" | "block";
  setMLoginDisplay: React.Dispatch<React.SetStateAction<"none" | "block">>;
}
