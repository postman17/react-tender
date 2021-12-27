import { axios } from 'src/api/axios';

export const getTendersSign = (params) => axios.get('tenders/', { params });