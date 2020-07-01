import axios from 'axios';
import {
    REACT_APP_BASE_BACKEND_URL
} from '../variables/React';

export default axios.create({
    baseURL: REACT_APP_BASE_BACKEND_URL,
    timeout: 10000,
});