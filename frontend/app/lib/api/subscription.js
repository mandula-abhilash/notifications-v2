import api from '../axios';

export const getCurrentSubscription = async () => {
  const response = await api.get('/api/subscriptions/current');
  return response.data;
};

export const upgradeToPro = async () => {
  const response = await api.post('/api/subscriptions/upgrade');
  return response.data;
};

export const cancelSubscription = async () => {
  const response = await api.post('/api/subscriptions/cancel');
  return response.data;
};