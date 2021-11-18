import * as React from "react";
import { query, getBy } from "../../../test-utils";
import { fireEvent, render } from "@testing-library/react";
import SearchBar from "@scriptsMy/Global/SearchBar/SearchBar";

test("render search results", async () => {
  const input = getBy("test_searchInput", <SearchBar />);
  const results = query("test_searchResults");
  await fireEvent.input(input, { target: { value: "ave" } });
  expect(results).toBeTruthy();
});
