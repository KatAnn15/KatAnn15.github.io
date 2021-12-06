import { initUser } from "@constants/Functions";
import { store } from "@test-utils";
import { waitFor } from "@testing-library/react";
import { getAuth } from "firebase/auth";

test("test firebase init", () => {
  const promise = Promise.resolve(getAuth());
  promise.then((auth) => expect(auth.currentUser?.email).toBe("test@test.com"));
});

test("test auth with initUser", () => {
  initUser();
  waitFor(() => expect(store.getState().membersStatus.value).toBeTruthy());
});
