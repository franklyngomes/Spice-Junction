import api from './axiosInstance';

export const signup = (data) => api.post('/signup', data).then(r => r.data);
export const signin = (data) => api.post('/signin', data).then(r => r.data);
// export const forgotPassword = (data) => api.post('/forgot-password', data).then(r => r.data);
// export const resetPassword = (data) => api.post('/reset-password', data).then(r => r.data);

export const getUserProfile = (id) =>
  api.get(`/user-profile/${id}`).then(r => r.data);

export const setUserAddress = (userId, payload) =>
  api.post(`/set-user-address/${userId}`, payload).then(r => r.data);

export const deleteUserAddress = (addressId) =>
  api.delete(`/delete-user-address/${addressId}`).then(r => r.data);

export const updateUserAddress = (addressId, payload) =>
  api.put?.(`/update-user-address/${addressId}`, payload).then(r => r?.data);
