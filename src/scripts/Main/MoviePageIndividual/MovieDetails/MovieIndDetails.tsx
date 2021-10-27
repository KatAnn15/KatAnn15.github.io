import React, { useEffect } from "react";
import { posterBase } from "@constants/Constants";
import { MovieItemDetailsProps } from "./MovieIndDetailsTypes";
import { getSelector } from "@redux/Actions";
import { getOneMovie } from "@redux/AsyncThunks/AsyncThunks";
import { useDispatch } from "react-redux";
import { netflixLogo } from "@constants/Constants";

const MovieItemDetails: React.FC<MovieItemDetailsProps["movieData"]> = ({
  id,
}) => {
  const dispatch = useDispatch();
  const movieDetails = getSelector("movie");
  const subscribed = getSelector("subscribedStatus");

  useEffect(() => {
    dispatch(getOneMovie(id));
  }, [getOneMovie, id]);
  return (
    <div className="movie-item-details_wrapper">
      <div
        className="movie-item_poster"
        style={{
          backgroundImage: movieDetails.poster_path
            ? `url(${posterBase + movieDetails.poster_path})`
            : `url(${netflixLogo})`,
        }}
      ></div>
      <div className="movie-item_main-data movie-item_block">
        <div className="movie-item_audience-data movie-item_sub-block">
          <h3 className="movie-item_audience-data_adult-status">
            {movieDetails.adult ? "Rated" : "General audience"}
          </h3>
        </div>
        <div className="movie-item_info movie-item_sub-block">
          <h2 className="movie-item_info_title">
            {movieDetails.original_title}
          </h2>
          <h3 className="movie-item_info_release-date">
            {movieDetails.release_date}
          </h3>
          <h3 className="movie-item_info_overview">{movieDetails.overview}</h3>
        </div>
      </div>
      {subscribed ? (
        <div></div>
      ) : (
        <div className="join-now-banner">
          <div className="join-now_text">
            <img
              className="join-now_logo"
              src="https://pngimg.com/uploads/netflix/netflix_PNG15.png"
              alt="netflix-logo"
            />
            <h3 className="join-now_subtitle">Watch all movies now.</h3>
          </div>
          <button className="join-now_action-btn">Join Now</button>
        </div>
      )}
      <div className="movie-item_tagline-wrapper">
        <h3 className="movie-item_info_tagline">{movieDetails.tagline}</h3>
      </div>
      <div className="movie-item_additional-info movie-item_block">
        <h2 className="movie-item_additional-info_details">More Details</h2>
        <div className="movie-item_stats movie-item_sub-block">
          <h3 className="movie-item_stats_popularity">
            <span>Popularity: </span> <br /> {movieDetails.popularity}
          </h3>
          <h3 className="movie-item_genres">
            <span>Genres:</span> <br />
          </h3>
          <h3 className="movie-item_stats_revenue">
            {" "}
            <span>Revenue: </span> <br /> {movieDetails.revenue}
          </h3>
          <h3 className="movie-item_stats_vote-count">
            {" "}
            <span>Voted:</span> <br /> {movieDetails.vote_count}
          </h3>
          <h3 className="movie-item_stats_status">
            <span>Release status:</span> <br /> {movieDetails.status}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MovieItemDetails;
