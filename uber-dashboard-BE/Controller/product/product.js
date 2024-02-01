import { Product } from "../../Schema/product/product.js";

///Add new menu item
export const addProduct = async (req, res, next) => {
  try {
    const newProduct = new Product({
      productName: req.body.productName,
      price: req.body.price,
      productId: req.body.productId,
      productImage: req.file.buffer.toString("base64"), // Store base64 image as a string
    });
    await newProduct.save();
    res.status(201).send({ message: "product added successfully" });
  } catch (error) {
    next(error);
    res.status(500).send(error);
  }
};

// get all orders
export const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    console.log("come in single api");

    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getProductBySearch = async (req, res, next) => {
  try {
    console.log("come in serch api");
    const searchTerm = req.params.searchTerm;
    const products = await Product.find({
      productName: { $regex: searchTerm, $options: "i" },
    });
    console.log(products.length, "products=====");
    if (products.length === 0) {
      return res.status(404).send({ message: "No products found" });
    }
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    next(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//delete order
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    console.log(req.body, "product");
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
    res.status(500).send(error);
  }
};

//delete order
export const updateProduct = async (req, res, next) => {
  try {
    console.log(req.params);

    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!product) res.status(400).send({ message: "Product not found" });

    res.status(201).send({ message: "Product updated" });
  } catch (error) {
    console.log(error);
    next(error);
    res.status(500).send(error);
  }
};
