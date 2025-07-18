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

  let { serverUrl } = useContext(authDataContext);

  const getSubCategories = (selectedCategory) => {
    return categoryOptions[selectedCategory] || [];
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setSubCategory(getSubCategories(newCategory)[0] || "");
  };

  const calculateDiscount = (currentMrp, currentPrice) => {
    const mrpValue = parseFloat(currentMrp);
    const priceValue = parseFloat(currentPrice);

    if (mrpValue > 0 && priceValue > 0 && priceValue < mrpValue) {
      const discount = ((mrpValue - priceValue) / mrpValue) * 100;
      setDiscountPercentage(Math.round(discount));
    } else {
      setDiscountPercentage(0);
    }
  };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPrice(newPrice);
    calculateDiscount(mrp, newPrice);
  };

  const handleMrpChange = (e) => {
    const newMrp = e.target.value;
    setMrp(newMrp);
    calculateDiscount(newMrp, price);
  };

  const handleAddProduct = async (e) => {
    setLoading(true);
    e.preventDefault();

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
        console.log(formData)
      let result = await axios.post(serverUrl + "/api/product/addproduct", formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
        
      console.log("API Response:", result.data);
      toast.success("ADD Product Successfully");
      setLoading(false);

      if (result.data) {
        setName("");
        setDescription("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice("");
        setMrp("");
        setDiscountPercentage(0);
        setBestSeller(false);
        setCategory("Men");
        setSubCategory(categoryOptions["Men"][0]);
        setSizes([]);
      }
    } catch (error) {
      console.log("Add Product Failed:", error);
      setLoading(false);
      toast.error("Add Product Failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className='w-[100vw] min-h-screen bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] text-[white] overflow-x-hidden relative'>
      <Nav />
      <Sidebar />

      <div className='w-[82%] h-full flex items-start justify-start overflow-y-auto absolute right-0'>

        <form onSubmit={handleAddProduct} className='w-[100%] md:w-[90%] mt-[70px] flex flex-col gap-[30px] py-[90px] px-[30px] md:px-[60px]'>
          <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-black'>Add Product Page</div>

          <div className='w-[80%] h-[130px] flex items-start justify-center flex-col mt-[20px] gap-[10px]'>
            <p className='text-[20px] text-[black] md:text-[25px] font-semibold'>
              Upload Images
            </p>
            <div className='w-[100%] h-[100%] flex items-center justify-start'>
              <label htmlFor="image1" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-black'>
                <img src={image1 ? URL.createObjectURL(image1) : upload} alt="Upload Image 1" className='w-[80%] h-[80%] object-cover rounded-lg shadow-2xl hover:border-black border-[2px] border-black' />
                <input type="file" id='image1' hidden onChange={event => setImage1(event.target.files[0])} required />
              </label>

              <label htmlFor="image2" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-black'>
                <img src={image2 ? URL.createObjectURL(image2) : upload} alt="Upload Image 2" className='w-[80%] h-[80%] object-cover rounded-lg shadow-2xl hover:border-black border-[2px] border-black' />
                <input type="file" id='image2' hidden onChange={event => setImage2(event.target.files[0])} required />
              </label>

              <label htmlFor="image3" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-black'>
                <img src={image3 ? URL.createObjectURL(image3) : upload} alt="Upload Image 3" className='w-[80%] h-[80%] object-cover rounded-lg shadow-2xl hover:border-black border-[2px] border-black' />
                <input type="file" id='image3' hidden onChange={event => setImage3(event.target.files[0])} required />
              </label>

              <label htmlFor="image4" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-black'>
                <img src={image4 ? URL.createObjectURL(image4) : upload} alt="Upload Image 4" className='w-[80%] h-[80%] object-cover rounded-lg shadow-2xl hover:border-black border-[2px] border-black' />
                <input type="file" id='image4' hidden onChange={event => setImage4(event.target.files[0])} required />
              </label>
            </div>
          </div>

          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] text-[black] md:text-[25px] font-semibold'>
              Product Name
            </p>
            <input
              type="text"
              placeholder='Type here'
              className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-black border-[2px] border-black cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]'
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>

          <div className='w-[80%] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] text-[black] md:text-[25px] font-semibold'>
              Product Description
            </p>
            <textarea
              placeholder='Type here'
              className='w-[600px] max-w-[98%] h-[100px] rounded-lg hover:border-black border-[2px] border-black cursor-pointer bg-slate-600 px-[20px] py-[10px] text-[18px] placeholder:text-[#ffffffc2]'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>

          <div className='w-[80%] flex items-center gap-[10px] flex-wrap'>
            <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px]'>
              <p className='text-[20px] text-[black] md:text-[25px] font-semibold w-[100%]'>Product Category</p>
              <select
                name="category"
                id="category"
                className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-black border-[2px] border-black'
                onChange={handleCategoryChange}
                value={category}
              >
                {Object.keys(categoryOptions).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px]'>
              <p className='text-[20px] text-[black] md:text-[25px] font-semibold w-[100%]'>Sub-Category</p>
              <select
                name="subCategory"
                id="subCategory"
                className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-black border-[2px] border-black'
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
              >
                {getSubCategories(category).map((subCat) => (
                  <option key={subCat} value={subCat}>{subCat}</option>
                ))}
              </select>
            </div>

            <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px]'>
              <p className='text-[20px] text-[black] md:text-[25px] font-semibold w-[100%]'>Add to BestSeller</p>
              <input
                type="checkbox"
                id='checkbox'
                checked={bestseller}
                onChange={() => setBestSeller(prev => !prev)}
                className='w-[25px] h-[25px] cursor-pointer'
              />
            </div>
          </div>

          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] text-[black] md:text-[25px] font-semibold'>
              MRP Price
            </p>
            <input
              type="number"
              placeholder='₹ 3000 (MRP)'
              className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-black border-[2px] border-black cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]'
              onChange={handleMrpChange}
              value={mrp}
              required
            />
          </div>

          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
            <p className='text-[20px] text-[black] md:text-[25px] font-semibold'>
              Product Price
            </p>
            <input
              type="number"
              placeholder='₹ 2000 (Selling Price)'
              className='w-[600px] max-w-[98%] h-[40px] rounded-lg hover:border-black border-[2px] border-black cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2]'
              onChange={handlePriceChange}
              value={price}
              required
            />
            {mrp > 0 && price > 0 && mrp > price && (
              <p className='text-[18px] text-green-700 font-medium mt-2'>
                Discount: {discountPercentage}% Off
              </p>
            )}
          </div>

          <div className='w-[80%] h-[220px] md:h-[100px] flex items-start justify-center flex-col gap-[10px] py-[10px] md:py-[0px]'>
            <p className='text-[20px] text-[black] md:text-[25px] font-semibold'>Product Size</p>
            <div className='flex items-center justify-start gap-[15px] flex-wrap'>
              {["S", "M", "L", "XL", "XXL"].map(size => (
                <div
                  key={size}
                  className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-black border-[2px] ${sizes.includes(size) ? "bg-green-400 text-black border-black" : "border-black"} cursor-pointer`}
                  onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className='
             w-[140px]
               px-[20px] py-[20px]
               rounded-xl
               bg-[#333333]
               hover:bg-[#c4b080]
               transition-colors duration-300 ease-in-out
               flex items-center justify-center gap-[10px]
               text-white
                hover:text-black
                hover:border-[1px]
               active:bg-slate-700
               cursor-pointer
               disabled:opacity-70
               disabled:cursor-not-allowed'
                disabled={loading}>
            {loading ? <Loading /> : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Add;