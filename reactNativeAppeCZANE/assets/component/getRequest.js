import axios from 'axios';

const getRequest = async (url) => {

    try {
        const response = await axios.get(url);
        return response.data;

    } catch (error) {
        return null;
    };
};




export default getRequest;

