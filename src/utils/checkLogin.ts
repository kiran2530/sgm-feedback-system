export const checkLogin = (): boolean => {
  if (typeof window !== "undefined" && localStorage.getItem("sgmAdminToken")) {
    return true;
  }
  return false; // Return false if running on the server
};
