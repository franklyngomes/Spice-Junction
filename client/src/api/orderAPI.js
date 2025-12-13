import axiosInstance from './axiosInstance';

export async function createOrder(payload) {
  const { data } = await axiosInstance.post('/create-order', payload);
  return data; 
}

export async function getCustomerPendingOrder(customerId) {
  const { data } = await axiosInstance.get(`/customer-pending-order/${customerId}`);
  return data;
}
