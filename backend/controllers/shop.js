const Product = require("../models/product");
const User = require("../models/user");

exports.addToCart = async (req, res, next) => {
  const prodId = req.body.productId;
  console.log("product id", prodId);
  try {
    const response = await req.user.addToCart(prodId);
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const response = await req.user.populate('cart.items.productId')
    res.status(200).json(response.cart.items);
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
};
exports.deleteCartItem = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = req.user;
    await user.removeItemFromCart(id);
    res.status(200).json(user.cart.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateCartItemQuantity = async (req, res, next) => {
  const cartItemId = req.params.id;
  const { quantity } = req.body;

  try {
    const user = req.user;
    await user.updateCartItemQuantity(cartItemId, quantity);
    res.status(200).json({ message: "Cart item quantity updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
