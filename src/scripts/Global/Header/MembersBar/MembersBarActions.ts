export function getMemberInfoFromCache() {
  const email = window.localStorage.getItem("appAuth-email");
  const name = window.localStorage.getItem("appAuth-name");
  if (email && name) {
    return [email, name];
  } else {
    return false;
  }
}
