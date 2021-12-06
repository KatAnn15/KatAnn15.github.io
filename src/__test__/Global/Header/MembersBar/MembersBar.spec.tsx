import { initUser } from "@constants/Functions";
import MembersBar from "@scriptsMy/Global/Header/MembersBar/MembersBar";
import { renderRedux, store } from "@test-utils";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import * as React from "react";

test("render members bar desktop", () => {
  jest.mock("react-device-detect", () => ({
    isMobile: false,
  }));
  Promise.resolve(initUser()).then(async () => {
    const { findByTestId } = await renderRedux(<MembersBar />);
    const test_myProfileBtn = await findByTestId("test_myProfileBtn");
    waitFor(() => expect(test_myProfileBtn).toBeTruthy()).then(async () => {
      const test_membersBarLoginBtn = await findByTestId(
        "test_membersBarLoginBtn"
      );
      expect(test_membersBarLoginBtn.style.display).toBe("block");

      fireEvent.click(test_membersBarLoginBtn);
      expect(store.getState().membersStatus).toBe(false);
      fireEvent.click(test_membersBarLoginBtn);
      expect((await screen.findByTestId("test_loginModal")).style.display).toBe(
        "block"
      );
      expect(store.getState().login.value).toBe(true);
    });
  });
});

test("render memebrs bar mobile", async () => {
  jest.mock("react-device-detect", () => ({
    isMobile: true,
  }));
  const { findByTestId } = await renderRedux(<MembersBar />);
  const test_membersBarLoginBtn = await findByTestId("test_membersBarLoginBtn");
  expect(test_membersBarLoginBtn.style.display).toBe("block");
  fireEvent.click(test_membersBarLoginBtn);
  expect(test_membersBarLoginBtn.style.top).toBe("-35px");
});
