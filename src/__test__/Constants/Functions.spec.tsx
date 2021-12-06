import * as React from "react";
import { initUser } from "@constants/Functions";
import { store } from "@test-utils";
import { waitFor } from "@testing-library/react";

test("get user info", () => {
  initUser();
  waitFor(() => expect(store.getState().membersStatus).toBe(true));
});
