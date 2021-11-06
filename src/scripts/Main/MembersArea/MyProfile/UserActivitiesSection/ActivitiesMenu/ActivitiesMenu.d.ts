import React from "react";

export interface ProfileCatsType {
  items: JSX.Element[] | [];
}

export interface ProfileCatsTypes {
  profileCat: ProfileCatsType["items"];
  setProfileCats: React.Dispatch<React.SetStateAction<ProfileCatsType>>;
}
