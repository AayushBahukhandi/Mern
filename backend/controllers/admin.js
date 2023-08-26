const fs = require('fs/promises')
const Product = require('../models/product')
const CarouselImage =require('../models/images')
exports.getProducts =async (req,res,next)=>{
   try{
        const response = await Product.find()
        res.status(200).json(response)
    }
    catch(err){
        res.status(404).json({err : err.message})
    } 
}

exports.getProduct =async (req,res,next)=>{
   try{
        const response = await Product.findById(req.params.id)
        res.status(200).json(response)
    }
    catch(err){
        res.status(404).json({err : err.message})
    } 
}

exports.postProduct = async (req, res, next) => {
    const { name, description, price, category, specifications } = req.body;
  
    try {
      const product = new Product({
        name,
        description,
        price,
        image: req.file.path,
        category,
        specifications: JSON.parse(specifications), // Parse the specifications string
      });
  
      const response = await product.save();
      res.status(200).json(response);
    } catch (err) {
      res.status(404).json({ err: err.message });
    }
  };
  
  exports.updateProduct = async (req, res, next) => {
    const { name, description, price, category, specifications } = req.body;
    console.log(req.body);
    console.log(req.file);

    const product = await Product.findById(req.params.id);
    console.log(product);
  
      if (req.file) {
        try {
          await fs.unlink(product.image);
        } catch (err) {
          return res.status(500).json({ message: "Unable to delete file" });
        }
      }
    
    
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name,
          description,
          price,
          image: req.file ? req.file.path : product.image,
          category,
          specifications: JSON.parse(specifications), // Parse the specifications string
        },
        { new: true } // To return the updated document
      );
  
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(404).json({ err: err.message });
    }
  };

exports.deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  try {
    await fs.unlink(product.image);
  } catch (err) {
    return res.status(500).json({ message: "Unable to delete file" });
  }

  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Failure" });
  }
};

exports.getImage = async (req, res, next) => {
    try {
      const response = await CarouselImage.find();
    //   const imageUrls = response.map((image) => image.imageUrls);
      res.status(200).json(response);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  };
  
 exports.postImage = async (req,res,next)=>{
    console.log(req.body)
    try{
        const response = await CarouselImage.create(req.body)
        res.status(200).json(response)
    }
    catch(err){
        res.status(404).json({err : err.message})
    }
}
exports.deleteImage = async (req,res,next)=>{

    try{
        const response = await CarouselImage.findByIdAndDelete(req.params.id)
        res.status(200).json(response)
    }
    catch(err){
        res.status(404).json({err : err.message})
    } 
}
