import HeaderHome from "@scriptsMy/Global/Header/HeaderHome/HeaderHome";
import { renderRedux } from "@test-utils";
import * as React from "react";
jest.mock("./__mocks__/HeaderHome");

test("render header home", async () => {
  const header = await renderRedux(<HeaderHome />);
  expect(header).toBeTruthy();
  expect(1).toBe(1);
});
