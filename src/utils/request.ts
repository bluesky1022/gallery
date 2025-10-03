import axios from 'axios';
import { store } from './../redux/store';
import { deleteUser } from '../redux/slices/user.slice';
import { toast } from 'sonner';
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const api = axios.create({
    baseURL: API_ENDPOINT,
});
// Add response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.status === 401) {
            toast.warning("Your account is out of time")
            store.dispatch(deleteUser());
        }
        return Promise.reject(error);
    }
);

export default api;