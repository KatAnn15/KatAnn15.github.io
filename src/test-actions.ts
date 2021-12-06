import { screen } from "@testing-library/react";
import { renderRedux } from "@test-utils";

export const query = (testId: string, element?: JSX.Element) => {
  if (element) {
    const promise = Promise.resolve(renderRedux(element));
    return promise.then((resp) => resp.queryByTestId(testId));
  }
  return screen.queryByTestId(testId);
};
export const getBy = (testId: string, element?: JSX.Element) => {
  if (element) {
    const promise = Promise.resolve(renderRedux(element));
    return promise.then((resp) => resp.getByTestId(testId));
  }
  return screen.getByTestId(testId);
};

export const findBy = (testId: string, element?: JSX.Element) => {
  if (element) {
    const promise = Promise.resolve(renderRedux(element));
    return promise.then((resp) => resp.findByTestId(testId));
  }
  return screen.findByTestId(testId);
};
