export const clearAllToken = () => {
  localStorage.removeItem("jwt");
};

export const setJwt = (jwt) => {
  localStorage.setItem("jwt", jwt);
};

export const getJwt = () => localStorage.getItem("jwt");
