import React from "react";

export interface DisplayElementTypes {
  displayElement: JSX.Element | null;
  setDisplayElement: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
}
