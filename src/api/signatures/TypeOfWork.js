import { axios } from 'src/api/axios';


export const getTypeOfWorksSign = () => axios.get('/types-of-works-categories/?limit=999&offset=0');