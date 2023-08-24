import * as httpRequest from "../utils/httpRequest.js";

export const getMenuCataLog = async () => {
    try{
        const res = await httpRequest.get("menuCatalog");
        return res;
    }
    catch(err){
        console.log(err);
    }

}