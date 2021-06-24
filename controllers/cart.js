const Cart = require('../models/cart_item');
const mongoose = require('mongoose');
const OrderDetail = require('../models/order_detail')
const OrderItem = require('../models/order_item')

const index = (req, res) => {
  if (req.user) {
    try {
      const ObjectId = mongoose.Types.ObjectId;
      var aggregateQuery = Cart.aggregate([
        {
          $match: { user_id: ObjectId(req.user._id) }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id', as: 'users'
          },
        },
      ])


      aggregateQuery.exec((err, result) => {
        result.filter(cart => {
          res.json(cart)
        })
      })

    } catch (error) {
      res.json(error.message)
    }
  } else {
    res.json({
      message: 'invalid Credentials'
    })
  }
}

// const store = async (req, res) => {
//   if (req.user) {
//     try {
//       const shopping_session = {
//         user_id: req.user._id,
//         total: req.body.total
//       }

//       const shopping = await ShoppingSession.create(shopping_session)

//       await Cart.create({ session_id: shopping._id, product_id: req.body.product_id, quantity: req.body.quantity })

//       res.json(shopping)
//     } catch (error) {
//       res.json(error.message)
//     }
//   } else {
//     res.json({
//       message: 'Cart Not Found'
//     })
//   }
// }


const cart = async (req, res) => {
  // const ObjectId = mongoose.Types.ObjectId;
  // if(req.user) {
  //   try {

  //     var aggregateQuery = ShoppingSession.aggregate([
  //       {
  //           $match: { user_id: ObjectId(req.user._id) }
  //       },
  //       {
  //           $lookup: {
  //               from: 'carts',
  //               localField: '_id',
  //               foreignField: 'session_id', as: 'cart'
  //           },
  //       },
  //   ])


  //   aggregateQuery.exec((err, result) => {
  //     res.json(result)
  //   })

  //   } catch (error) {
  //     res.json(error.message)
  //   }
  // } else {
  //   res.json({
  //     message: 'invalid Credentials'
  //   })
  // }
  // references https://stackoverflow.com/questions/59174763/how-to-add-product-to-shopping-cart-with-nodejs-express-and-mongoose
  const { productId, quantity, price, total } = req.body;

  if (req.user) {
    const userId = req.user._id
    let cart = await Cart.findOne({ user_id: userId });

    if (cart) {

      let itemIndex = cart.products.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {
        // action if product exists on car
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity
        productItem.price = price
        cart.products[itemIndex] = productItem;

        // get total

        let totalSum = 0

        for (const items of cart.products) {
          totalSum += items.quantity * items.price
        }

        cart.total = totalSum

      } else {

        // action if product null on crt
        cart.products.push({
          productId, quantity, price
        })

      }

      cart = await cart.save()


      const ObjectId = mongoose.Types.ObjectId;

      var aggregateQuery = Cart.aggregate([
        {
          $match: { user_id: ObjectId(userId) }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id', as: 'users'
          },
        },
      ])


      aggregateQuery.exec((err, result) => {
        result.filter(cart => {
          res.json(cart)
        })
      })

    } else {

      const newCart = await Cart.create({
        user_id: userId,
        products: [{ productId, quantity, price }],
        total: total
      });

      return res.json(newCart)
    }
  }
}

const remove = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  if (req.user) {
    try {
      const userId = req.user._id
      await Cart.updateOne({
        user_id: userId
      }, {
        $pull: { "products": { _id: ObjectId(req.body._id) } }
      })

      // let cart_ = await Cart.findOne({ user_id: userId });

      var aggregateQuery = Cart.aggregate([
        {
          $match: { user_id: ObjectId(userId) }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id', as: 'users'
          },
        },
      ])


      aggregateQuery.exec((err, result) => {
        result.filter(cart => {
          res.json(cart)
        })
      })
    } catch (error) {
      res.json(error.message)
    }
  }
}

const order = async (req, res) => {

  const ObjectId = mongoose.Types.ObjectId;

  const { productId, payment_id } = req.body;

  console.log(productId.productId)

  if (req.user) {

    const userId = req.user._id

    let cart = await Cart.findOne({ user_id: userId });

    let itemIndex = cart.products.findIndex(p => p.productId == productId.productId);
    let productItem = cart.products[itemIndex];
   


    let totalSum = 0;
    for (const items of cart.products) {
      totalSum += items.quantity * items.price
    }

    const order_detail = await OrderDetail.create({
      user_id: ObjectId(userId),
      total: totalSum,
      payment_id: payment_id
    })
    console.log(productItem._id)
    // productItem.filter(cart => {
    //   // if(cart.productId == ObjectId(req.body.product_id)) {
    //     // console.log(cart)
    //     return OrderItem.create({
    //       order_id: order_detail._id,
    //         cart_items: [{
    //           productId: cart.productId,
    //           quantity: cart.quantity,
    //           price: cart.price,
    //       }]
    //     })
    //   // }
      
    // })

   await OrderItem.create({
      order_id: order_detail._id,
        cart_items: [{
          productId: productItem.productId,
          quantity: productItem.quantity,
          price: productItem.price,
      }]
    })

    // _id: ObjectId(req.body._id)
    await Cart.updateOne({
      user_id: userId
    }, {
      $pull: { "products": {  _id: ObjectId(productItem._id) } }
    })

    res.json('success')

  }

}

module.exports = {
  index,
  cart,
  remove,
  order
}