import Product from "../model/product.model.js";
import elasticsearch from "../../elasticsearch/elasticsearch.js";

const client = elasticsearch();

const elasticsearchController = {
    synchronizedData: async (req, res, next) => {
        try {
            const listProductElasticsearch = [];
            const listProduct = await Product.find();
            const listDifferentProduct = arrayDiff(listProduct, listProductElasticsearch);
            listDifferentProduct.map(async differentProduct => {
                const {_id, ...others} = differentProduct._doc;
                await client.index({
                    index: 'products',
                    id: _id,
                    body: {
                        ...others
                    }
                })
            })
            res.status(200).json("Success");
        }
        catch (error) {
            res.status(400).json("Bad Request");
        }
    },

    search: async (req, res, next) => {
        try {
            let stringSearch = wildcardString(req.query.q);
            const body = await client.search({
                index: 'products',
                body: {
                  query: {
                    query_string : {default_field : "name", query : stringSearch}
                  } 
                },
                filter_path: "hits.hits._source"
              })
              let listProductAfterFilter = handleArray(body?.hits?.hits);
              res.json(listProductAfterFilter);
        } catch (error) {
            console.log(error);
        }
        
    }
}

function handleArray(arr) {
    return arr?.map(b => b._source)
}

function wildcardString(str) {
    return "*" + str.split('').join('*') + "*";
}


function arrayDiff(a, b) {
    let difference = [];
    for (let i = 0; i < a.length; i++) {
        if (b.indexOf(a[i]) === -1) {
            difference.push(a[i]);
        }
    }
    return difference;
};

export default elasticsearchController;
