import * as React from "react";
import firebase from "@scriptsMy/Global/Firebase/firebase_setup";
import { fireEvent, waitFor } from "@testing-library/react";
import LoginModal from "@scriptsMy/Global/Header/LoginModal/LoginModal";
import { getBy } from "../../../../test-actions";
import { renderRedux, store } from "@test-utils";

test("authenticate with email and password", () => {
  firebase
    .auth()
    .createUserWithEmailAndPassword("test@test.com", "12345")
    .then((resp) => {
      waitFor(() => expect(resp.user?.email).toBe("test@test.com"));
    });
});

test("check existing user with email and password", () => {
  const user = firebase
    .auth()
    .signInWithEmailAndPassword("test@test.com", "12345")
    .then((resp) => {
      waitFor(() => expect(resp.user?.email).toBe("test@test.com"));
    });
});

test("check if user signs in", async () => {
  const { getByTestId } = await renderRedux(<LoginModal />);
  const modal = await getByTestId("test_loginModal");
  const test_emailInput = await getByTestId("test_emailInput");
  const test_passInput = await getByTestId("test_passInput");
  const test_loginSubmitBtn = await getByTestId("test_loginSubmitBtn");
  fireEvent.input(test_emailInput, { target: { value: "test@test.com" } });
  fireEvent.input(test_passInput, { target: { value: "12345" } });
  fireEvent.click(test_loginSubmitBtn);
  waitFor(() => expect(store.getState().membersStatus.value).toBe(true));
  waitFor(() =>
    expect(store.getState().user.value.email).toBe("test@test.com")
  );
});
