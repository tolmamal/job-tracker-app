import axios from 'axios';

const BASE_URL = 'https://job-tracker-8e89e.firebaseio.com/';

const axiosInstance = axios.create({
    baseURL: BASE_URL
});

//TODO: check maybe need to change - /applications.json
const addJobApplication = (title, company, status) => {
    return axiosInstance.post(`${BASE_URL}/applications`, {
        title,
        status,
        company
    });

};

export default {
    addJobApplication
};
