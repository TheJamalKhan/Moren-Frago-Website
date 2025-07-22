import React, { useState, useEffect, useContext } from 'react';
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext'; // Ensure this context provides 'products'
import Card from '../component/Card'; // Ensure this Card component is flexible (no fixed w- classes)

function Collections() {
  // Define the category and sub-category options
  const categoryOptions = {
    "Men": ["Top-wear", "Bottom-wear", "Winter-wear"],
    "Daily-Gears": ["Bottles", "Gloves", "Home"],
    "Lifestyle": ["Spects", "Travel-wear", "Caps"]
  };

  const [showFilter, setShowFilter] = useState(false);
  const { products, search, showSearch } = useContext(shopDataContext);
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const getSubCategoriesForDisplay = () => {
    const allSubCategories = new Set();
    selectedCategories.forEach(cat => {
      const subs = categoryOptions[cat] || [];
      subs.forEach(sub => allSubCategories.add(sub));
    });
    return Array.from(allSubCategories);
  };

  const subCategoriesToDisplay = getSubCategoriesForDisplay();

  useEffect(() => {
    let currentProducts = products ? [...products] : [];

    // Apply Search Filter
    if (showSearch && search) {
      const lowercasedSearch = search.toLowerCase();
      currentProducts = currentProducts.filter(item =>
        item.name.toLowerCase().includes(lowercasedSearch) ||
        item.category.toLowerCase().includes(lowercasedSearch) ||
        (item.subCategory && item.subCategory.toLowerCase().includes(lowercasedSearch)) // Check if subCategory exists
      );
    }

    // Apply Category Filter
    if (selectedCategories.length > 0) {
      currentProducts = currentProducts.filter(item => selectedCategories.includes(item.category));
    }

    // Apply Sub-Category Filter
    if (selectedSubCategories.length > 0) {
      currentProducts = currentProducts.filter(item => selectedSubCategories.includes(item.subCategory));
    }

    // Apply Sorting
    if (sortType === "low-high") {
      currentProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      currentProducts.sort((a, b) => b.price - a.price); // Corrected: b.price - a.price
    }

    setFilteredAndSortedProducts(currentProducts);

  }, [products, selectedCategories, selectedSubCategories, sortType, search, showSearch]); // Dependencies for re-running effect

  useEffect(() => {
    setSelectedSubCategories(prevSubCats => {
      const validSubCategories = prevSubCats.filter(subCat => {
        for (const categoryName in categoryOptions) {
          if (categoryOptions[categoryName].includes(subCat)) {
            return selectedCategories.includes(categoryName);
          }
        }
        return false;
      });

      if (JSON.stringify(validSubCategories) !== JSON.stringify(prevSubCats)) {
        return validSubCategories;
      }
      return prevSubCats;
    });
  }, [selectedCategories, categoryOptions]);

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories(prev => {
      const newSelected = checked ? [...prev, value] : prev.filter(cat => cat !== value);
      return newSelected;
    });
  };

  const handleSubCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedSubCategories(prev =>
      checked ? [...prev, value] : prev.filter(subCat => subCat !== value)
    );
  };

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  return (
    <div className='w-full min-h-[100vh] bg-gradient-to-r from-[#f3d9c8] to-[#e8cbb3] pt-[70px] overflow-x-hidden z-[2] pb-[70px]'>
      {/* Main content area: Flex for mobile, Grid for md and up */}
      <div className="flex flex-col md:grid md:grid-cols-[30vw_1fr] lg:grid-cols-[20vw_1fr] min-h-[calc(100vh-70px)]">
        {/* Filters Sidebar */}
        <div className={`w-full md:min-h-[100vh] ${showFilter ? "h-auto" : "h-[8vh]"} p-[20px] border-r-[1px] border-[#141414] text-[#0b0c28] transition-all duration-300 ease-in-out overflow-hidden md:overflow-visible`}>
          <p className='text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer ' onClick={() => setShowFilter(prev => !prev)}>
            FILTERS
            {!showFilter && <FaChevronRight className='text-[18px] md:hidden ' />}
            {showFilter && <FaChevronDown className='text-[18px] md:hidden' />}
          </p>

          {/* CATEGORIES Box */}
          <div className={`border-[2px] border-[#141414] pl-5 py-3 mt-6 rounded-md bg-[#e6b892] ${showFilter ? "" : "hidden"} md:block`}>
            <p className='text-[18px] text-[#180f0f] font-semibold'>CATEGORIES</p>
            <div className='w-full flex items-start justify-center gap-[10px] flex-col mt-2'>
              {Object.keys(categoryOptions).map((cat) => (
                <label key={cat} className='flex items-center gap-[10px] text-[16px] font-light cursor-pointer'>
                  <input
                    type="checkbox"
                    value={cat}
                    className='w-4 h-4 accent-[#d97706]'
                    checked={selectedCategories.includes(cat)}
                    onChange={handleCategoryChange}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* SUB-CATEGORIES Box */}
          {selectedCategories.length > 0 && subCategoriesToDisplay.length > 0 ? (
            <div className={`border-[2px] border-[#141414] pl-5 py-3 mt-6 rounded-md bg-[#e6b892] ${showFilter ? "" : "hidden"} md:block`}>
              <p className='text-[18px] text-[#180f0f] font-semibold'>
                SUB-CATEGORIES ({selectedCategories.join(', ')})
              </p>
              <div className='w-full flex items-start justify-center gap-[10px] flex-col mt-2'>
                {subCategoriesToDisplay.map((subCat) => (
                  <label key={subCat} className='flex items-center gap-[10px] text-[16px] font-light cursor-pointer'>
                    <input
                      type="checkbox"
                      value={subCat}
                      className='w-4 h-4 accent-[#d97706]'
                      checked={selectedSubCategories.includes(subCat)}
                      onChange={handleSubCategoryChange}
                    />
                    {subCat}
                  </label>
                ))}
              </div>
            </div>
          ) : ( // Show all sub-categories if no main categories are selected
            <div className={`border-[2px] border-[#141414] pl-5 py-3 mt-6 rounded-md bg-[#e6b892] ${showFilter ? "" : "hidden"} md:block`}>
              <p className='text-[18px] text-[#180f0f] font-semibold'>
                SUB-CATEGORIES (All)
              </p>
              <div className='w-full flex items-start justify-center gap-[10px] flex-col mt-2'>
                {Array.from(new Set(Object.values(categoryOptions).flat())).map((subCat) => (
                  <label key={subCat} className='flex items-center gap-[10px] text-[16px] font-light cursor-pointer'>
                    <input
                      type="checkbox"
                      value={subCat}
                      className='w-4 h-4 accent-[#d97706]'
                      checked={selectedSubCategories.includes(subCat)}
                      onChange={handleSubCategoryChange}
                    />
                    {subCat}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Display Area */}
        <div className='w-full p-4'>
          <div className='w-full p-[20] flex justify-between flex-col lg:flex-row lg:px-[50px]'>
            <Title text1={"ALL"} text2={"COLLECTIONS"} />
            {/* Sort By Dropdown */}
            <div className="relative inline-block w-[60%] md:w-[200px] mt-4 lg:mt-0">
              <select
                name="sortBy"
                id="sortBy"
                className='
                  block appearance-none w-full h-[50px] px-[10px] py-2
                  bg-[#e6b892] text-[#141414] font-small
                  rounded-lg border-2 border-[#828080]
                  hover:border-[#d97706] focus:outline-none focus:ring-2 focus:ring-[#d97706] focus:ring-opacity-50
                  shadow-sm cursor-pointer transition-all duration-200 ease-in-out
                  pr-10
                '
                value={sortType}
                onChange={handleSortChange}
              >
                <option value="relevant">Sort By: Relevant</option>
                <option value="low-high">Sort By: Low to High</option>
                <option value="high-low">Sort By: High to Low</option>
              </select>
              {/* Custom arrow for the select dropdown */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#141414]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          {/* Product Cards Grid */}
          <div className='w-full
                               grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
                               gap-6 items-start p-4'>
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map((item) => (
                <Card
                  key={item._id}
                  name={item.name}
                  image={item.image1}
                  id={item._id}
                  price={item.price}
                  mrp={item.mrp}
                  discountPercentage={item.discountPercentage}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center text-xl col-span-full mt-10">No products found matching your filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collections;