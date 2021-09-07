import axios from 'axios';

const options = {
    baseURL:"http://localhost:5003/api/profile"
}
axios.interceptors.response.use((response) => {
    return response.data;
})
export default axios.create(options);