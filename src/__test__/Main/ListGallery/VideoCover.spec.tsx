import * as React from "react";
import { render } from "@testing-library/react";
import VideoCover from "@scriptsMy/Main/ListGallery/ListGalleryItem/VideoCover";

test("video cover should have a url", () => {
  const { getByTestId } = render(<VideoCover videoCover="some-url-here" />);
  expect(getByTestId("test-video-cover").innerHTML).toContain("some-url-here");
});
