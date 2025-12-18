import axios from "axios";

const instance = axios.create({
  baseURL: "https://natours-backend-six.vercel.app/api/v1",
});
export default instance;
