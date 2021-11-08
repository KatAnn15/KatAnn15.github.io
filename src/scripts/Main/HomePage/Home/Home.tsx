import * as React from "react";
import AboveTheFold from "../AboveTheFold/AboveTheFold";
import ListGallery from "../../ListGallery/ListGallery";
import FAQList from "../FAQ/FAQList";
import HeaderHome from "../../../Global/Header/HeaderHome/HeaderHome";

const HomePage: React.FC = () => {
  return (
    <div className="home-page-wrapper">
      <HeaderHome />
      <AboveTheFold />
      <ListGallery />
      <FAQList />
    </div>
  );
};

export default HomePage;
