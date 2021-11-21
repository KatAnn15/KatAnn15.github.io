import * as React from "react";
import ListGallery from "@scriptsMy/Main/ListGallery/ListGallery";
import { getBy } from "@test-utils";

test("render gallery list", () => {
  const list = getBy("test_list", <ListGallery />);
  console.log(list);
  expect(list.children.length).toBeGreaterThan(0);
});
