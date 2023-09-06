import axios from 'axios'
const { HOST } = require("../api");

const instance = axios.create({
    baseURL: HOST
});

export default instance