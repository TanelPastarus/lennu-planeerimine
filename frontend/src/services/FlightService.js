import axios from "axios";

const REST_API_URL = "http://localhost:8080/flights"

export const getAllFlights = () => {
    return axios.get(REST_API_URL);
}

export const getFlightById = (id) => {
    return axios.get(`${REST_API_URL}/${id}`);
};

export const updateFlight = (flight) => {
    axios.put(`${REST_API_URL}/update`, flight);
};

export const saveBoughtFlight = (boughtFlight) => {
    axios.put(`${REST_API_URL}/boughtflight/save`, boughtFlight);
};

export const getBoughtFlights = () => {
    return axios.get(`${REST_API_URL}/boughtflights`);
};