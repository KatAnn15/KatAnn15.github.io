import React, { useEffect } from "react";
import { isTablet } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "@redux/AsyncThunks/AsyncThunks";

interface MovieItemVideoProps {
  id: string;
}

const MovieItemVideos: React.FC<MovieItemVideoProps> = ({ id }) => {
  const dispatch = useDispatch();
  const videos = useSelector(
    (state: { videos: { value: any[] } }) => state.videos
  );

  useEffect(() => {
    dispatch(getVideos(id));
  }, [getVideos, id]);

  return (
    <div
      className="movie-item-video_wrapper"
      style={{
        marginTop: "50px",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      {videos.value.map((video, i) => (
        <iframe
          className="movie-item_video_container"
          style={{ border: "none", margin: "5px" }}
          width={isTablet ? "45%" : "500px"}
          height="250px"
          src={`https://www.youtube.com/embed/${video.key}/`}
          title="YouTube video player"
          key={"video" + i}
        ></iframe>
      ))}
    </div>
  );
};

export default MovieItemVideos;
