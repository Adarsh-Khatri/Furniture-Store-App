import axios from 'axios';

// const baseURL = "http://localhost:2410";
const baseURL = "https://furniture-store-app.onrender.com";


const getApi = async (url) => {
  let arr = await axios.get(`${baseURL}${url}`);
  return arr.data;
}

const postApi = async (url, obj) => {
  let arr = await axios.post(`${baseURL}${url}`, obj);
  return arr.data;
}

const putApi = async (url, obj) => {
  let arr = await axios.put(`${baseURL}${url}`, obj);
  return arr.data;
}

const deleteApi = async (url) => {
  let arr = await axios.delete(`${baseURL}${url}`)
  return arr.data;
}



export { getApi, postApi, deleteApi, putApi }