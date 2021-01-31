import axios from "axios";
import { API_URL } from "./Constants";

export const documents = () => {
  return axios.get(`${API_URL}/api/documents`).then((res) => {
    return res.data.files;
  });
};
export const documentFile = (fileName) => {
  if (fileName === "styles.css") {
    return axios.get(`${API_URL}/api/documents/styles.css`).then((res) => {
      return res.data;
    });
  }
  if (fileName === "strings.json") {
    return axios.get(`${API_URL}/api/documents/strings.json`).then((res) => {
      return res.data;
    });
  } else {
    return axios.get(`${API_URL}/api/documents/${fileName}`).then((res) => {
      return res.data;
    });
  }
};
export const createDocument = (name, type, content) => {
  return axios
    .post(`${API_URL}/api/documents`, { name, type, content })
    .then((res) => {
      return res.data;
    });
};

export const deleteDocument = (fileName) => {
  return axios.delete(`${API_URL}/api/documents/${fileName}`).then((res) => {
    return res.data;
  });
};
export const deleteString = (alias) => {
  return axios.delete(`${API_URL}/api/strings/${alias}`).then((res) => {
    return res.data;
  });
};

export const createStyle = (name, content) => {
  return axios
    .post(`${API_URL}/api/documents`, { name, content })
    .then((res) => {
      return res.data;
    });
};

export const downloadAllFiles = (content) => {
  const url = window.URL.createObjectURL(
    new Blob([content], {
      type: "text/plain",
    })
  );
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "templates.json");
  document.body.appendChild(link);
  link.click();
};
