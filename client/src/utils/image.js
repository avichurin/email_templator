import axios from "axios";
import { API_URL } from "./Constants";

export const images = () => {
  return axios.get(`${API_URL}/api/assets/images`).then((res) => {
    return res.data;
  });
};
export const createImage = (fileName, fileData) => {
  return axios
    .post(`${API_URL}/api/assets/images`, { fileName, fileData })
    .then((res) => {
      return images();
    });
};
export const deleteImage = (fileName) => {
  console.log(fileName);
  return axios
    .delete(`${API_URL}/api/assets/images/${fileName}`)
    .then((res) => {
      return images();
    });
};
