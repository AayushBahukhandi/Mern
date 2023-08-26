const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  deleteCartItem,
  updateCartItemQuantity,
} = require("../controllers/shop");
const { getProduct, getProducts } = require("../controllers/admin");
const isAuth=require('../middleware/is-auth')

router.get("/getProducts", getProducts);

router.get("/getProduct/:id", getProduct);

router.post("/addToCart", addToCart);


router.use(isAuth)
router.get("/getCart", getCart);

router.delete("/deleteCartItem/:id", deleteCartItem);

router.put("/updateCartItemQuantity/:id", updateCartItemQuantity);


module.exports = router;
