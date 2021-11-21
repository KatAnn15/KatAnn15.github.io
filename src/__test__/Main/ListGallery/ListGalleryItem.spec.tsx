import * as React from "react";
import { render, screen } from "@testing-library/react";
import ListGalleryItem from "@scriptsMy/Main/ListGallery/ListGalleryItem/ListGalleryItem";

test("display gallery item info", () => {
  const { getByTestId } = render(
    <ListGalleryItem
      title="Title"
      subtitle="subtitle"
      mediaURL="media url"
      mediaAlt="media alt"
      additionalBox={true}
      videoCover="video cover"
      downloadGif="download gif"
      imageURL="image-url"
      name="Name"
    />
  );
  const box = screen.queryByTestId("test_additionalBox");

  expect(getByTestId("test_item-title").textContent).toBe("Title");
  expect(getByTestId("test_item-subtitle").textContent).toBe("subtitle");
  expect(getByTestId("test_item-image").getAttribute("src")).toContain(
    "media url"
  );
  expect(box).toBeTruthy();
});
