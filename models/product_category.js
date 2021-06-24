const { model, Schema  } = require('../config/connection');

const ProductCategorySchema = new Schema({
    name: String,
    desc: String,
}, {
    timestamps: true, versionKey: false
})

const ProductCategory = model('product_categories', ProductCategorySchema);

module.exports = ProductCategory