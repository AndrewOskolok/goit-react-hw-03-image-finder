import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api";
const API_KEY = process.env.REACT_APP_API_KEY;
export const PER_PAGE = 20;

export const requestApi = (userRequest, numberPage) => {
  return axios.get(
    `/?q=${userRequest}&page=${numberPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
  );
};
