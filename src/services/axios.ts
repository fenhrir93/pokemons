import Axios from "axios";

export const BASE_URL = "https://pokeapi.co/api/v2/";
const axios = Axios.create({ baseURL: BASE_URL });
export default axios;
