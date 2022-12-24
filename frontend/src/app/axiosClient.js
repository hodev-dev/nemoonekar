import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const refreshAuthLogic = () => axios.get('/sanctum/csrf-cookie').then((response) => Promise.resolve());
const cancelToken = axios.CancelToken.source();

createAuthRefreshInterceptor(axios, refreshAuthLogic, { statusCodes: [419, 401] });

export { axios as Axios };
export { cancelToken };