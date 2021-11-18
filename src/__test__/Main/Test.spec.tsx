import React from "react";
import { render } from "@testing-library/react";
import TestComponent from "@scriptsMy/Main/Test/Test";

test("render test component", () => {
  const { getByTestId } = render(<TestComponent />);
  expect(getByTestId("test-element").textContent).toBe("Hello world!");
});
