import * as httpRequest from "../utils/httpRequest.js"

export const getCatalog = async () => {
    try {
        const res = await httpRequest.get("catalog")
        return res;
    }
    catch(err) {
        console.log(err);
    }
} 