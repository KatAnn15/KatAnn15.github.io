const getSelector = require("./__mocks__/Actions");
jest.mock("./__mocks__/Actions");

test("get selector", () => {
  const user = getSelector("user");
  expect(user).toBeNull();
});

export {};
