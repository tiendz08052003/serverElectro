import * as httpRequest from "../utils/httpRequest.js";

export const getSelection = async () => {
    try {
        const res= await httpRequest.get("selection");
        return res;
    }
    catch(err) {
        console.log(err);
    }
} 


