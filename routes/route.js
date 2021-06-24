const express = require('express');

var cors = require('cors')
const router = express.Router();
require('express-router-group');

const productController = require('../controllers/productController');
const cart = require('../controllers/cart');
const productCategory = require('../controllers/productCategoryController');
const productInventory = require('../controllers/productInventoryController');
const productDiskon = require('../controllers/discountController');
const userController = require('../controllers/userController');
const userAddressController = require('../controllers/userAddressController');
const userPaymentController = require('../controllers/userPaymentController');
const authController = require('../controllers/authController');
const phoneController = require('../controllers/phoneController')
const orderController = require('../controllers/orderController')
router.group('/v1', (router) => {

    router.group('/auth', (router) => {
        router.post('/register', authController.register)
        router.post('/login', authController.login)
        router.get('/profile', authController.profile)
    })

    router.group('/user', (router) => {

        router.get('/', userController.index)

        router.group('/address', (router) => {
            router.get('/', userAddressController.index)
            router.post('/create-address', userAddressController.store)
        })

        router.group('/payment', (router) => {
            router.get('/', userPaymentController.index)
            router.get('/create-account', userPaymentController.store)
        })

        router.group('/phone', (router) => {
            router.post('/create-phone', phoneController.store)
        })

        router.group('/cart', (router) => {
            router.get('/', cart.index);
            router.post('/cart-create', cart.cart);
            router.put('/remove', cart.remove)
        })

        router.group('/order-cart', (router) => {
            router.post('/create', cart.order)
            router.get('/detail', orderController.index)
        })
    })

    router.group('/product', (router) => {
        router.get('/', productController.index);
        router.post('/create', productController.store)
        router.get('/show/:id', productController.show)

        router.group('/category', (router) => {
            router.get('/', productCategory.index);
            router.post('/create', productCategory.store)
        })

        router.group('/inventory', (router) => {
            router.get('/', productInventory.index)
            router.post('/create', productInventory.store)
        })

        router.group('/discount', (router) => {
            router.get('/', productDiskon.index)
            router.post('/create', productDiskon.store)
        })

    })
})

module.exports = router;
