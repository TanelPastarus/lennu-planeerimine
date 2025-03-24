import axios from "axios";

const REST_API_URL = "http://localhost:8080/flights"

export const getAllEmployees = () => {
    return axios.get(REST_API_URL);
}