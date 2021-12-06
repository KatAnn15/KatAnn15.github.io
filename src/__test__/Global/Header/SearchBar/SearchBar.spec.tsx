import * as React from "react";
import { query, getBy, findBy } from "../../../../test-actions";
import { fireEvent, render, waitFor } from "@testing-library/react";
import SearchBar from "@scriptsMy/Global/SearchBar/SearchBar";

test("render search results", async () => {
  const input = await getBy("test_searchInput", <SearchBar />);
  waitFor(() => expect(input).toBeTruthy()).then(async () => {
    await fireEvent.input(input, { target: { value: "ave" } });
    const results = await findBy("test_searchResults");
    waitFor(async () => expect(results?.children.length).toBeGreaterThan(0));
  });
});
