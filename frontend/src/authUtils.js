// authUtils.js
import axios from 'axios';

export const checkAuth = async () => {
    try {
        const response = await axios.get('http://127.0.0.1/verify-access-token');
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        return false;
    }
}; 