import detailsType from "./detailsType.js";
import detailsCatalog from "./detailsCatalog.js";
import type from "./type.js";
import product from "./product.js";
import cart from "./cart.js"
import compare from "./compare.js"
import wishlist from "./wishlist.js"
import catalog from "./catalog.js"
import combineProduct_CombineDetailsCatalog_CombineType_Catalog from "./combineProduct_CombineDetailsCatalog_CombineType_Catalog.js"
import combineDetailsCatalog_CombineType_Catalog from "./combineDetailsCatalog_CombineType_Catalog.js"
import brand from "./brand.js"
import color from "./color.js"
import account from "./account.js"
import storage from "./storage.js"
import main from "./main.js"
import chat from "./chat.js"
import combineType_Catalog from "./combineType_Catalog.js"

function routes(app) {
    app.use('/api/chat', chat);

    app.use('/api/storage', storage);

    app.use('/api/account', account);

    app.use('/api/color', color);

    app.use('/api/brand', brand);

    app.use('/api/combineProduct_CombineDetailsCatalog_CombineType_Catalog', combineProduct_CombineDetailsCatalog_CombineType_Catalog);
    
    app.use('/api/combineDetailsCatalog_CombineType_Catalog', combineDetailsCatalog_CombineType_Catalog);

    app.use('/api/combineType_Catalog', combineType_Catalog);

    app.use('/api/catalog', catalog);

    app.use('/api/detailsCatalog', detailsCatalog);

    app.use('/api/detailsType', detailsType);

    app.use('/api/type', type);
    
    app.use('/api/product', product);
    
    app.use('/api/wishlist', wishlist);
    
    app.use('/api/compare', compare);

    app.use('/api/cart', cart);

    app.use('/', main);
}
    

export default routes;