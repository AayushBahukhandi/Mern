const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin:"Boolean",
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (prodId) {
  const existingProductIndex = this.cart.items.findIndex(
    (p) => p.productId.toString() === prodId.toString()
  );
  let newQuantity = 1;
  let updatedCartItems = [...this.cart.items];

  // console.log(existingProductIndex);
  if (existingProductIndex >= 0) {
    newQuantity = this.cart.items[existingProductIndex].quantity + 1;
    updatedCartItems[existingProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: prodId,
      quantity: newQuantity,
    });
  }
  // console.log(updatedCartItems);
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.removeItemFromCart = function (prodId) {
  const updatedCartItems = this.cart.items.filter((p) => {
    return p._id.toString() !== prodId.toString();
  });
  console.log(updatedCartItems);

  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart.items = [];
  return this.save();
};
// Assuming you have a User model with a cart property

// User model method to update cart item quantity
userSchema.methods.updateCartItemQuantity = function (cartItemId, quantity) {
  const cartItem = this.cart.items.find((item) => item._id.toString() === cartItemId);

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  cartItem.quantity = quantity;

  return this.save();
};


module.exports = mongoose.model("User", userSchema);
