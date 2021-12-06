import * as React from "react";
import ListGallery from "@scriptsMy/Main/ListGallery/ListGallery";
import { getBy } from "../../../test-actions";
import { waitFor } from "@testing-library/react";

test("render gallery list", async () => {
  const list = await getBy("test_list", <ListGallery />);
  waitFor(() => expect(list.children.length).toBeGreaterThan(0));
});
