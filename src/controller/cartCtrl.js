const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");

const addItemToCart = asyncHandler(async (req, res) => {
  try {
    const user = req.user._id;
    const cart = await Cart.findOne({ user });
    if (cart) {
      // if cart already exists than update cart by quality
      const product = req.body.cartItems.product;
      const existCartitem = cart.cartItems.find((item) => {
        return item.product.toString() === product;
      });

      if (existCartitem) {
        // If cart item exists, update the quantity
        const { quantity } = existCartitem;
        existCartitem.quantity = quantity + req.body.cartItems.quantity;
      } else {
        // If cart item does not exist, add it to the cartItems array
        cart.cartItems.push(req.body.cartItems);
      }
      await cart.save();
      res.json(cart);
    } else {
      // if cart not exist then create a new cart
      const newCart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      const createdCart = await Cart.create(newCart);
      res.json(createdCart);
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { addItemToCart };
