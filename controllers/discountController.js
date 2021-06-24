const Discount = require('../models/discount');
const ApiResponser = require('../traits/ApiResponse');

const index = async (req, res) => {
    const discount = await Discount.find({})
    const data = new ApiResponser('GET', discount, 200);

    try {

        res.json(data.data)

    } catch (error) {

        res.json(err)

    }
}


const store = async (req, res) => {

    const discount_form = {
        name: req.body.name,
        desc: req.body.desc,
        discount_percent: req.body.discount_percent,
        active: req.body.active
    }

    try {
        const discount = await Discount.create(discount_form);

        res.json({
            'method': 'POST',
            'result': discount
        })
    } catch (error) {
        res.json(error.message)
    }
}


module.exports = {
    index,
    store
}