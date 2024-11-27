import axios from '../api.config';


export const getState = () => {
    return axios.get('/state/list');
}

export const getLGA = (stateId: number) => {
    return axios.get(`/lga/stateid/${stateId}`)
}

export const getWard = (lgaId: number) => {
    return axios.get(`/ward/lgaid/${lgaId}`);
}