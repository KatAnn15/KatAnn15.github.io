import * as React from "react";

interface VideoCoverProps {
  videoCover: string;
}

const VideoCover: React.FC<VideoCoverProps> = ({ videoCover }) => {
  return (
    <div className="video-cover_wrapper" data-testid="test-video-cover">
      <video autoPlay loop className="video-cover_item">
        <source src={videoCover} />
      </video>
    </div>
  );
};

export default VideoCover;
