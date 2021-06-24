const ProductInventory = require('../models/product_inventory');
const ApiResponser = require('../traits/ApiResponse');

const index = async (req, res) => {

    try {

        const customer = await ProductInventory.find()

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
        quantity: req.body.quantity,
        image_product: req.body.image_product,
        image_detail: [{
            url: req.body.url,
            title: req.body.title
        }],
        size_product: [{
            size: req.body.size,
        }]
    }

    try {
        const productInventory = await ProductInventory.create(product_category);

        res.json({
            'method': 'POST',
            'result': productInventory
        })
    } catch (error) {
        res.json(error.message)
    }
}


module.exports = {
    index,
    store
}