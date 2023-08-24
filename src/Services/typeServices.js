import * as httpRequest from "../utils/httpRequest.js";

export const getType = async () => {
    try {
        const res= await httpRequest.get("type");
        return res;
    }
    catch(err) {
        console.log(err);
    }
} 


