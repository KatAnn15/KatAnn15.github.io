import { store } from "@redux/GlobalReducer";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockImplementation(() => "url"),
  Link: "Link",
  Route: ({ children, path }) => children({ match: path === "/somewhere" }),
  useHistory: jest.fn(() => ({
    listen: jest.fn(),
  })),
}));

const user = {
  uid: "1234uid",
  email: "test@test.com",
  displayName: "Test name",
};

const docsData = {
  data: () => ({ data: "some data" }),
};

// jest.mock("firebase/app", () => ({
//   initializeApp: jest.fn().mockReturnValue({
//     currentUser: user,
//     auth: jest.fn().mockReturnValue({
//       GoogleAuthProvider: jest.fn(),
//       getAuth: jest.fn().mockReturnValue({
//         currentUser: user,
//         onAuthStateChanged: jest.fn().mockReturnValue({ currentUser: user }),
//       }),
//     }),
//     firestore: jest.fn().mockReturnValue({
//       collection: jest.fn().mockReturnValue({
//         add: jest.fn(() => Promise.resolve({ uid: "12345uid" })),
//         set: jest.fn(() => Promise.resolve({ uid: "12345uid" })),
//         get: jest.fn(() => Promise.resolve([docsData])),
//       }),
//     }),
//     storage: jest.fn(),
//   }),
// }));

jest.mock("firebase/compat", () => ({
  initializeApp: jest.fn().mockReturnValue({
    currentUser: user,
  }),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => Promise.resolve(user)),
  currentUser: user,
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
