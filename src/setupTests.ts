import { store } from "@redux/GlobalReducer";

jest.mock("./scripts/Global/Firebase/firebase_setup", () => {
  const firebasemock = require("firebase-mock");
  const mockdatabase = new firebasemock.MockFirebase();
  const mockauth = new firebasemock.MockFirebase();
  const mocksdk = new firebasemock.MockFirebaseSdk(
    (path) => {
      return path ? mockdatabase.child(path) : mockdatabase;
    },
    () => {
      return mockauth;
    }
  );
  return mocksdk.initializeApp({ key: "some key" });
});

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockImplementation(() => "url"),
  Link: "Link",
  Route: ({ children, path }) => children({ match: path === "/somewhere" }),
  useHistory: jest.fn(() => ({
    listen: jest.fn(),
  })),
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn().mockImplementation(() => store.getState),
  useDispatch: () => mockDispatch.mockImplementation(() => store.dispatch),
}));
const testData = {
  title: "Title",
  data: "data",
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: [testData] }),
  })
) as jest.Mock;
