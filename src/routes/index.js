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
    app.use('/storage', storage);

    app.use('/auth', auth);

    app.use('/color', color);

    app.use('/brand', brand);

    app.use('/productCatalog', productCatalog);

    app.use('/menu', menu);

    app.use('/catalog', catalog);

    app.use('/type', types);

    app.use('/selection', selection);
    
    app.use('/product', product);
    
    app.use('/wishlist', wishlist);
    
    app.use('/compare', compare);

    app.use('/cart', cart);
    
}
    

export default routes;