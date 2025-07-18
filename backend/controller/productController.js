import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {
    try {
        let { name, description, price, category, subCategory, sizes, bestseller, mrp, discountPercentage } = req.body;

        let image1 = null;
        let image2 = null;
        let image3 = null;
        let image4 = null;

        if (req.files && req.files.image1 && req.files.image1[0]) {
            image1 = await uploadOnCloudinary(req.files.image1[0].path);
        }
        if (req.files && req.files.image2 && req.files.image2[0]) {
            image2 = await uploadOnCloudinary(req.files.image2[0].path);
        }
        if (req.files && req.files.image3 && req.files.image3[0]) {
            image3 = await uploadOnCloudinary(req.files.image3[0].path);
        }
        if (req.files && req.files.image4 && req.files.image4[0]) {
            image4 = await uploadOnCloudinary(req.files.image4[0].path);
        }
        
        let productData = {
            name,
            description,
            price : Number(price),
            mrp : Number(mrp),
            discountPercentage : Number(discountPercentage),
            category,
            subCategory,
            sizes : JSON.parse(sizes),
            bestseller : bestseller === "true" ? true : false,
            date : Date.now(),
            image1,
            image2,
            image3,
            image4
        }

        const product = await Product.create(productData);

        return res.status(201).json({ success: true, message: "Product Added", product });

    } catch (error) {
        console.log("AddProduct error:", error);
        return res.status(500).json({message:`AddProduct error ${error.message}`});
    }
}

export const listProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("ListProduct error:", error);
        return res.status(500).json({message:`ListProduct error ${error.message}`});
    }
}

export const removeProduct = async (req, res) => {
    try {
        let {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Product Removed", product });
    } catch (error) {
        console.log("RemoveProduct error:", error);
        return res.status(500).json({message:`RemoveProduct error ${error.message}`});
    }
}