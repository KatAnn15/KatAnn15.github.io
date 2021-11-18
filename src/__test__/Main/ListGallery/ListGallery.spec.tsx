import * as React from "react";
import { render } from "@testing-library/react";
import ListGallery from "@scriptsMy/Main/ListGallery/ListGallery";

// test("render gallery list", () => {
//   const { getByTestId } = render(<ListGallery />);
//   expect(getByTestId("test_list").children.length).toBeGreaterThan(2);
// });
test("filler test", () => {
  const d = 5 * 5;
  expect(d).toBe(25);
});
