const keyName = "username";

const storeUser = (obj) => {
  let user = JSON.stringify(obj);
  return localStorage.setItem(keyName, user)
}

const removeUser = async () => {
  return localStorage.removeItem(keyName);
}

const getUser = () => {
  let user = localStorage.getItem(keyName);
  return JSON.parse(user) || null;
}

export { storeUser, removeUser, getUser }