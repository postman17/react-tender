import { axios } from 'src/api/axios';

export const getCurrentUserSign = () => axios.get('/users/current/');
