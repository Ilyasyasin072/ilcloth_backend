const ProductCategory = require('../models/product_category');
const ApiResponser = require('../traits/ApiResponse');

const index = async (req, res) => {

    try {

        const customer = await ProductCategory.find()

        const data = new ApiResponser('GET', customer, 200);

        res.json(data.data)
    
    } catch (error) {

        const err = new ApiResponser('GET', error.message, 200);

        res.json(err)
    }
}

const store = async (req, res) => {

    const product_category = {
        name: req.body.name,
        desc: req.body.desc,
    }

    try {
        const productCategory = await ProductCategory.create(product_category);

        res.json({
            'method': 'POST',
            'result': productCategory
        })
    } catch (error) {
        res.json(error.message)
    }
}


module.exports = {
    index,
    store
}