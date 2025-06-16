import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Lấy danh sách các loại công việc
export const getJobTypes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/job-types`);
    return response.data;
  } catch (error) {
    console.error('Error fetching job types:', error);
    throw error;
  }
};

// Lấy danh sách sự kiện của user
export const getEvents = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/events`, {
      params: { userId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Tạo sự kiện mới
export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${BASE_URL}/events`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Cập nhật sự kiện
export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axios.put(`${BASE_URL}/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

// Xóa sự kiện
export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Kiểm tra trùng lịch
export const checkEventConflict = async (eventData) => {
  try {
    const response = await axios.post(`${BASE_URL}/events/check-conflict`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error checking event conflict:', error);
    throw error;
  }
};

// Lấy sự kiện theo khoảng thời gian
export const getEventsByDateRange = async (startDate, endDate, userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/events/range`, {
      params: { startDate, endDate, userId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching events by date range:', error);
    throw error;
  }
}; 