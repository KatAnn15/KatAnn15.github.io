import * as React from "react";
import "./TagStrip.scss";

const TagStrip: React.FC = () => {
  return (
    <div className="tag-strip-wrapper">
      <h2 className="tag-header">Your title goes here</h2>
      <p className="tag-body">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quam at
        similique voluptatum repudiandae architecto ipsa sapiente totam possimus
        necessitatibus dignissimos ...
      </p>
      <div className="tag-icons">
        <img src="https://img.icons8.com/fluency/48/000000/film-reel.png" />
        <img src="https://img.icons8.com/external-konkapp-flat-konkapp/64/000000/external-movie-seat-cinema-konkapp-flat-konkapp.png" />
        <img src="https://img.icons8.com/color-glass/50/000000/imdb.png" />
        <img src="https://img.icons8.com/color/48/000000/wonder-woman.png" />
      </div>
    </div>
  );
};

export default TagStrip;
