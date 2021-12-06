import * as reactRedux from "react-redux";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn().mockImplementation(() => "url"),
  Route: ({ children, path }) => children({ match: path === "/somewhere" }),
  Link: jest.fn(),
  useHistory: jest.fn(() => ({
    listen: jest.fn(),
  })),
}));

const user = {
  uid: "1234uid",
  email: "test@test.com",
  displayName: "Test name",
  updateProfile: jest.fn(() => Promise.resolve(true)),
  photoURL: "some photo",
};

const firebasemock = require("firebase-mock");

const mockauth = new firebasemock.MockAuthentication();
const mockdatabase = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
const mockstorage = new firebasemock.MockStorage();
const mockmessaging = new firebasemock.MockMessaging();
const mocksdk = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  (path) => {
    return path ? mockdatabase.child(path) : mockdatabase;
  },
  // use null if your code does not use AUTHENTICATION
  () => {
    return mockauth;
  },
  // use null if your code does not use FIRESTORE
  () => {
    return mockfirestore;
  },
  // use null if your code does not use STORAGE
  () => {
    return mockstorage;
  },
  // use null if your code does not use MESSAGING
  () => {
    return mockmessaging;
  }
);

jest.mock("./scripts/Global/Firebase/firebase_setup.ts", () => {
  return mocksdk;
});

mocksdk.auth().changeAuthState({
  uid: "testUid",
  provider: "custom",
  token: "authToken",
  expires: Math.floor(new Date().getTime() + 1000) + 24 * 60 * 60,
  auth: {
    isAdmin: true,
  },
});
mocksdk.auth().flush();

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn().mockReturnValue({
    currentUser: user,
    onAuthStateChanged: jest.fn().mockReturnValue({ currentUser: user }),
  }),
}));

jest.mock("firebase/storage", () => ({
  ref: jest.fn().mockReturnValue("data"),
  getDownloadURL: () => Promise.resolve("some url"),
}));

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(() => ({
    onSnapshot: jest.fn(() => Promise.resolve(true)),
    collection: jest.fn(() => Promise.resolve(true)),
  })),
}));
const testData = {
  title: "Title",
  data: "data",
  id: "12323",
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: [testData] }),
  })
) as jest.Mock;

jest.mock("react-device-detect", () => ({
  isMobile: true,
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn().mockImplementation((init) => [init, jest.fn()]),
  useEffect: jest.fn(),
  useCallback: jest.fn(),
}));
