import axios from "axios";

export const getAllPosts = async () => {
  const { data } = await axios.get(`/api/posts`);
  return data;
};

export const getPost = async ({ queryKey }) => {
  const [_key, id] = queryKey;
  const { data } = await axios.get(`/api/posts/${id}`);
  return data;
};

export const updatePost = async ({ id, ...changes }) => {
  const { data } = await axios.patch(`/api/posts/${id}`, changes);
  return data;
};

export const createPost = async ({ ...post }) => {
  const { data } = await axios.post(`/api/posts`, post);
  return data;
};

export const createComment = async ({ postId, comment }) => {
  const { data } = await axios.post(`/api/posts/${postId}/comments`, comment);
  return data;
};

export const removePost = async (id) => {
  const { data } = await axios.delete(`/api/posts/${id}`);
  return data;
};
