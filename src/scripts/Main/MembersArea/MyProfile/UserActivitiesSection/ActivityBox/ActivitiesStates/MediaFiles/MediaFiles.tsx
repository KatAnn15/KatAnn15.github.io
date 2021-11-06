import * as React from "react";
import { MediaFilesTypes } from "./MediaFiles.d";
import "./MediaFiles.scss";

const MediaFiles: React.FC<MediaFilesTypes> = ({ data }) => {
  return (
    <div className="media-files-wrapper">
      <h3 className="media-files_title">My Media</h3>
      <div className="media-container">
        {data.photos.map((url, i) => (
          <img src={url} key={"mf" + i}></img>
        ))}
      </div>
    </div>
  );
};

export default MediaFiles;
