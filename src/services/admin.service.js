const { default: axios } = require("axios");
const { default: authHeader } = require("./auth-header");

const url = 'http://localhost:8000/';

const getBooks = () => {
    return axios.get(`${url}books`, {headers: authHeader()});
}

const adminService = {
    getBooks,
};

export default adminService;