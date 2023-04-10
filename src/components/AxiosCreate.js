import axios from "axios";

const Client = axios.create({
    baseURL: "http://localhost:3006/contactItems"
});

export default Client;