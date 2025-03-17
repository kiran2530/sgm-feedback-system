export const checkLogin = () => {
  if (localStorage.getItem("sgmAdminToken")) {
    return true;
  } else {
    return false;
  }
};
