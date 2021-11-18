import { callDispatch, getSelector } from "@redux/Actions";
import {
  setFirestoreData,
  setStorageData,
} from "@redux/AsyncThunks/AsyncThunks";
import { setActivities } from "@redux/StateReducers";
import * as React from "react";
import { MediaFilesTypes } from "./MediaFiles.d";
import "./MediaFiles.scss";
import MediaItem from "./MediaItem/MediaItem";

const MediaFiles: React.FC<MediaFilesTypes> = ({ data }) => {
  const profileCategory = getSelector("profileCategory");
  const activities = getSelector("profileActivities");
  const user = getSelector("user");
  const dispatch = callDispatch();

  const addFilesHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const uid = user.uid;
    if (files) {
      dispatch(setStorageData({ uid: uid, files: files })).then((response) => {
        let newPhotos: any[] = [];
        if (activities[profileCategory][0].photos) {
          newPhotos = [...activities[profileCategory]][0].photos;
        }
        newPhotos = newPhotos.concat(response.payload);
        dispatch(
          setFirestoreData({
            uid: uid,
            collection: "MediaFiles",
            files: { photos: newPhotos },
          })
        ).then(() => {
          dispatch(
            setActivities({
              ...activities,
              [profileCategory]: [{ photos: newPhotos }],
            })
          );
        });
      });
    }
  };
  return (
    <div className="media-files-wrapper">
      <h3 className="media-files_title">
        <i className="fas fa-photo-video"></i> My Media
      </h3>
      <div className="media-container">
        {data?.photos.map((url, i) => (
          <MediaItem data={{ url: url, i: i }} key={"mi" + i} />
        ))}
      </div>
      <input
        type="file"
        id="add-media_input"
        multiple
        hidden
        onChange={(e) => addFilesHandler(e)}
      />
      <label htmlFor="add-media_input" className="add-media_btn">
        <i className="fas fa-plus"></i> Add files
      </label>
    </div>
  );
};

export default MediaFiles;
