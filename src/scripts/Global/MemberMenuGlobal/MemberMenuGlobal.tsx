import * as React from "react";
import { Link } from "react-router-dom";
import "./MemberMenuGlobal.scss";

const MemberMenuGlobal: React.FC = () => {
  return (
    <div className="member-menu-global-wrapper">
      <div className="member-menu_container">
        <span>Explore my area</span>
        <div className="member-nav">
          <Link to={"/my-profile"} className="my-profile_link">
            My Profile
          </Link>
          <Link to={"/movies"} className="my-movies_link">
            Movies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MemberMenuGlobal;
