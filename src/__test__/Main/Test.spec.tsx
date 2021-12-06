import React from "react";
import TestComponent from "@scriptsMy/Main/Test/Test";
import { getBy } from "../../test-actions";
import { waitFor } from "@testing-library/react";

test("render test component", async () => {
  const test = await getBy("test-element", <TestComponent />);
  waitFor(() => expect(test.innerHTML).toContain("Title!"));
});
