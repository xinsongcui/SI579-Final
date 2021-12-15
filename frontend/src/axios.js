import axios from 'axios'

const instance = axios.create({
    baseURL: "https://si579.herokuapp.com/", 
});

export default instance;