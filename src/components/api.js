import axios from 'axios';

const API_ENDPOINT = 'https://api.placefy.in/api/v1/user/getNotified';

export const sendNotification = async (email) => {
    try {
        const response = await axios.post(API_ENDPOINT, { email });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};
