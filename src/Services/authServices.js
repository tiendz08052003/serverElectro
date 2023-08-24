import * as httpRequest from "../utils/httpRequest.js";

export const getAuth = async () => {
    try{
        const res = await httpRequest.get("auth");
        return res;
    }
    catch(err){
        console.log(err);
    }

}