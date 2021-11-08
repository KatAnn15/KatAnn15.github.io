import * as React from "react";
import { callDispatch, getSelector } from "@redux/Actions";
import { MediaItemTypes } from "../MediaFiles.d";
import {
  setFirestoreData,
  setStorageData,
} from "@redux/AsyncThunks/AsyncThunks";
import { setActivities } from "@redux/StateReducers";
import "./MediaItem.scss";
import { documentsExtensions, videoExtensions } from "@constants/Constants";

const MediaItem: React.FC<MediaItemTypes> = ({ data }) => {
  const { url, i } = data;
  const profileCategory = getSelector("profileCategory");
  const activities = getSelector("profileActivities");
  const user = getSelector("user");
  const dispatch = callDispatch();
  const downloadImage =
    "https://firebasestorage.googleapis.com/v0/b/prototype-ae9eb.appspot.com/o/Members%2FMyProfile%2Fdownload.png?alt=media&token=ecfc85fc-8fe0-42ba-9195-00f7283c188b";

  const removeFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const image = data.url;
    const uid = user.uid;
    const newPhotos = [...activities[profileCategory]][0].photos.filter(
      (photo) => photo !== image
    );
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
  };

  const play = (event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
    const video = event.target as HTMLMediaElement;
    video.play();
  };
  const stop = (event: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
    const video = event.target as HTMLMediaElement;
    video.pause();
  };
  return (
    <div className="media-item-wrapper">
      {videoExtensions.find((item) => url.includes(item + "?")) ? (
        <video
          src={url}
          onMouseEnter={(e) => play(e)}
          onMouseLeave={(e) => stop(e)}
        ></video>
      ) : documentsExtensions.find((item) => url.includes(item + "?")) ? (
        <img src={downloadImage} onClick={() => (window.location.href = url)} />
      ) : (
        <img src={url} key={"mf" + i}></img>
      )}
      <button className="remove-item_btn" onClick={(e) => removeFile(e)}>
        <i className="far fa-trash-alt"></i>
      </button>
    </div>
  );
};

export default MediaItem;
