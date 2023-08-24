import * as httpRequest from "../utils/httpRequest.js";

export const getProduct = async () => {
    try{
        const res = await httpRequest.get("product");
        return res;
    }
    catch(err){
        console.log(err);
    }

}