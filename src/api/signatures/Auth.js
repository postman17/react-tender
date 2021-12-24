import { axios } from 'src/api/axios';


export const authLoginSign = (data) => axios.post('/auth/obtain/', data);
