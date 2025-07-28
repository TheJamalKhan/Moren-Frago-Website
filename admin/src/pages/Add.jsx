import React, { useState, useContext } from 'react';
import Nav from '../component/Nav';
import Sidebar from '../component/Sidebar';
import upload from '../assets/upload image.jpg';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function Add() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const categoryOptions = {
    "Men": ["Top-wear", "Bottom-wear", "Winter-wear"],
    "Daily-Gears": ["Bottles", "Gloves", "Home"],
    "Lifestyle": ["Spects", "Travel-wear", "Caps"]
  };

  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState(categoryOptions["Men"][0]);
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(authDataContext);

  const getSubCategories = (selectedCategory) => categoryOptions[selectedCategory] || [];

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setSubCategory(getSubCategories(newCategory)[0] || "");
  };

  const calculateDiscount = (mrp, price) => {
    const mrpVal = parseFloat(mrp);
    const priceVal = parseFloat(price);
    if (mrpVal > 0 && priceVal > 0 && priceVal < mrpVal) {
      const discount = ((mrpVal - priceVal) / mrpVal) * 100;
      setDiscountPercentage(Math.round(discount));
    } else {
      setDiscountPercentage(0);
    }
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    calculateDiscount(mrp, e.target.value);
  };

  const handleMrpChange = (e) => {
    setMrp(e.target.value);
    calculateDiscount(e.target.value, price);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("mrp", mrp);
      formData.append("discountPercentage", discountPercentage);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const result = await axios.post(serverUrl + "/api/product/addproduct", formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success("Product added successfully!");
      setName("");
      setDescription("");
      setImage1(null); setImage2(null); setImage3(null); setImage4(null);
      setPrice(""); setMrp(""); setDiscountPercentage(0); setBestSeller(false);
      setCategory("Men"); setSubCategory(categoryOptions["Men"][0]); setSizes([]);
    } catch (error) {
      console.error("Add Product Failed:", error);
      toast.error("Add Product Failed: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] min-h-screen">
      <Nav />
      <div className="flex h-screen pt-[70px]">
        <div className="w-64 flex-shrink-0 hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="w-full bg-[#e2b07e] backdrop-blur-lg rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#4A2E2A] mb-6">Add New Product</h1>
            <form onSubmit={handleAddProduct} className="space-y-6 text-[#4A2E2A]">
              {/* Image Upload */}
              <div>
                <label className="font-semibold text-lg block mb-2">Upload Images</label>
                <div className="flex gap-4 flex-wrap">
                  {[image1, image2, image3, image4].map((img, idx) => (
                    <label key={idx} className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] cursor-pointer">
                      <img src={img ? URL.createObjectURL(img) : upload} alt="upload" className="w-full h-full object-cover rounded-lg border-2 border-black" />
                      <input hidden type="file" onChange={(e) => {
                        const file = e.target.files[0];
                        if (idx === 0) setImage1(file);
                        else if (idx === 1) setImage2(file);
                        else if (idx === 2) setImage3(file);
                        else setImage4(file);
                      }} required />
                    </label>
                  ))}
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block font-semibold mb-1">Product Name</label>
                <input type="text" className="w-full p-2 border-2 border-black rounded-md bg-white" placeholder="Type here" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              {/* Description */}
              <div>
                <label className="block font-semibold mb-1">Product Description</label>
                <textarea className="w-full p-2 border-2 border-black rounded-md bg-white" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </div>

              {/* Category & Subcategory */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select className="w-full p-2 border-2 border-black rounded-md bg-white" value={category} onChange={handleCategoryChange}>
                    {Object.keys(categoryOptions).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">Sub-Category</label>
                  <select className="w-full p-2 border-2 border-black rounded-md bg-white" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
                    {getSubCategories(category).map(sub => <option key={sub} value={sub}>{sub}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-2 mt-6">
                  <input type="checkbox" checked={bestseller} onChange={() => setBestSeller(!bestseller)} />
                  <label className="font-semibold">Best Seller</label>
                </div>
              </div>

              {/* MRP & Price */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold mb-1">MRP</label>
                  <input type="number" className="w-full p-2 border-2 border-black rounded-md bg-white" value={mrp} onChange={handleMrpChange} required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Price</label>
                  <input type="number" className="w-full p-2 border-2 border-black rounded-md bg-white" value={price} onChange={handlePriceChange} required />
                  {discountPercentage > 0 && (
                    <p className="text-green-700 text-sm mt-1">Discount: {discountPercentage}% OFF</p>
                  )}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block font-semibold mb-2">Sizes</label>
                <div className="flex gap-3 flex-wrap">
                  {["S", "M", "L", "XL", "XXL"].map(size => (
                    <div key={size}
                      className={`px-4 py-2 rounded-lg border-2 border-black cursor-pointer ${
                        sizes.includes(size) ? "bg-green-400 text-black" : "bg-white"
                      }`}
                      onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])}>
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button type="submit"
                  disabled={loading}
                  className="bg-[#333] hover:bg-[#c4b080] text-white hover:text-black px-6 py-3 rounded-lg transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed">
                  {loading ? <Loading /> : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Add;
