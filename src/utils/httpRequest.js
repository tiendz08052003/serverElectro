import axios from "axios";

const httpRequest = axios.create({
    baseURL: "https://be-electro-api.onrender.com/"
})

export const get = async (path, options) => {
    const res = await httpRequest.get(path, options);
    return res.data;
}

export const post = async (path, data) => {
    const res = await httpRequest.post(path, data);
    return res.data;
}

export const update = async (path, data) => {
    const res = await httpRequest.patch(path, data);
    return res.data;
}

export const deleteSingle = async (path, data) => {
    const res = await httpRequest.delete(path, data);
    return res.data;
}


export default httpRequest