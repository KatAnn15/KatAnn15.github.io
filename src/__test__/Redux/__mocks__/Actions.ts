import { store } from "@test-utils";
module.exports = jest.fn().mockReturnValue(store.getState().user.value);
