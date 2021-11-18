import * as React from "react";
import { fireEvent } from "@testing-library/react";
import { getBy, render, screen } from "../../../test-utils";
import MoviesPage from "@scriptsMy/Main/MoviesPage/MoviesPage/MoviesPage";
import HeaderGlobal from "@scriptsMy/Global/Header/HeaderGlobal/HeaderGlobal";

test("expand filter widget", async () => {
  const test_filterWidget = screen.queryByTestId("test_filterWidget");
  const test_filterToggle = getBy("test_filterToggle", <HeaderGlobal />);
  await fireEvent.click(test_filterToggle);
  expect(test_filterWidget).toBeTruthy();
});
