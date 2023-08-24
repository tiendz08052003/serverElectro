import * as httpRequest from "../utils/httpRequest.js";

export const getStorage = async () => {
    try {
        const res = await httpRequest.get("storage");
        return res;
    }
    catch {
        res.status(404).json("not get storage");
    }
}

export const postStorage = async (data) => {
    try {
        const res =  await httpRequest.post("storage/create/store", data);
        return res;
    }
    catch {
        res.status(404).json("not get storage");
    }
}

export const deleteStorage = async (data) => {
    try {
        const res =  await httpRequest.deleteSingle("storage/delete/" + data);
        return res;
    }
    catch {
        res.status(404).json("not get storage");
    }
}