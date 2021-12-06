import * as React from "react";
import { render } from "@testing-library/react";
import VideoCover from "@scriptsMy/Main/ListGallery/ListGalleryItem/VideoCover";

test("video cover should have a url", async () => {
  const videoCover = await render(<VideoCover videoCover="some-url-here" />);
  expect(videoCover.getByTestId("test-video-cover").innerHTML).toContain(
    "some-url-here"
  );
});
