import { initUser } from "@constants/Functions";
import { store } from "@test-utils";

test("get user info", () => {
  initUser();
  const status = store.getState().membersStatus;
  expect(status).toBe(true);
});
