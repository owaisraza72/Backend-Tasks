import axios from "axios";

const API = "http://localhost:5000/api";

export const createPost = async (formData) => {
  const res = await axios.post(`${API}/upload`, formData);
  return res.data;
};

export const getPosts = async () => {
  const res = await axios.get(`${API}/media`);
  return res.data;
};
