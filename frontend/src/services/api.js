import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  getProfile: () => API.get('/auth/profile'),
  toggleWishlist: (propertyId) => API.post('/auth/wishlist/toggle', { propertyId }),
  getWishlist: () => API.get('/auth/wishlist'),
};

export const propertyAPI = {
  getAll: (params) => API.get('/properties', { params }),
  getFeatured: () => API.get('/properties/featured'),
  getById: (id) => API.get(`/properties/${id}`),
  compare: (ids) => API.get(`/properties/compare?ids=${ids.join(',')}`),
  create: (data) => API.post('/properties', data),
  update: (id, data) => API.put(`/properties/${id}`, data),
  delete: (id) => API.delete(`/properties/${id}`),
};

export const agentAPI = {
  getAll: () => API.get('/agents'),
  getById: (id) => API.get(`/agents/${id}`),
};

export const bookingAPI = {
  create: (data) => API.post('/bookings', data),
  getMyBookings: () => API.get('/bookings/my'),
  getAllBookings: () => API.get('/bookings/all'),
  updateStatus: (id, status) => API.patch(`/bookings/${id}/status`, { status }),
};

export const enquiryAPI = {
  create: (data) => API.post('/enquiries', data),
  getAll: () => API.get('/enquiries'),
  updateStatus: (id, status) => API.patch(`/enquiries/${id}/status`, { status }),
};

export const notificationAPI = {
  getAll: () => API.get('/notifications'),
  markRead: (id) => API.patch(`/notifications/${id}/read`),
  markAllRead: () => API.patch('/notifications/mark-all/read'),
};

export const adminAPI = {
  getStats: () => API.get('/admin/stats'),
};

export default API;
