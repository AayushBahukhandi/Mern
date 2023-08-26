const express=require('express');
const router=express.Router();

const {
    getProducts, 
    getProduct, 
    postProduct,
    deleteProduct,
    updateProduct,
    getImage,
    postImage,
    deleteImage,
} = require('../controllers/admin')

// const isAuth=require('../middleware/is-auth')
const upload = require("../middleware/file-upload");

router.get('/getProducts', getProducts)
router.post("/addProduct",upload.single("image"), postProduct);

router.patch('/updateProduct/:id',upload.single("image"), updateProduct)
router.get('/getProduct/:id', getProduct)

router.get('/getImage',getImage)

router.post('/postImage',postImage)


router.delete('/deleteProduct/:id', deleteProduct)

router.delete('/deleteImage/:id',deleteImage)
// router.use(isAuth)

module.exports = router