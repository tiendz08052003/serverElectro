import types from "./type.js";
import selection from "./selection.js";
import product from "./product.js";
import cart from "./cart.js"
import compare from "./compare.js"
import wishlist from "./wishlist.js"
import catalog from "./catalog.js"
import menu from "./menu.js"
import productCatalog from "./productCatalog.js"
import brand from "./brand.js"
import color from "./color.js"
import auth from "./auth.js"
import storage from "./storage.js"

function routes(app) {
    app.use('/api/storage', storage);

    app.use('/api/auth', auth);

    app.use('/api/color', color);

    app.use('/api/brand', brand);

    app.use('/api/productCatalog', productCatalog);

    app.use('/api/menu', menu);

    app.use('/api/catalog', catalog);

    app.use('/api/type', types);

    app.use('/api/selection', selection);
    
    app.use('/api/product', product);
    
    app.use('/api/wishlist', wishlist);
    
    app.use('/api/compare', compare);

    app.use('/api/cart', cart);
}
    

export default routes;