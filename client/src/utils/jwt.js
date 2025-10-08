export const getJwtPayload = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch { return null; }
};

export const getCustomerIdFromToken = () => {
  const token = sessionStorage.getItem('token');
  if (!token) return null;
  const p = getJwtPayload(token);
  return p?._id || p?.id || null;
};
