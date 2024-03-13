import * as httpRequest from "../utils/httpRequest.js";

export const getProductCatalog = async () => {
    try{
        const res = await httpRequest.get("productCatalog");
        return res;
    }
    catch(err){
        console.log(err);
    }

}