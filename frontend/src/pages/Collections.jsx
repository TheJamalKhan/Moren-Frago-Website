import React, { useState, useEffect, useContext } from 'react';
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {
    const categoryOptions = {
        "Men": ["Top-wear", "Bottom-wear", "Winter-wear"],
        "Daily-Gears": ["Bottles", "Gloves", "Home"],
        "Lifestyle": ["Spects", "Travel-wear", "Caps"]
    };

    const [showFilter, setShowFilter] = useState(window.innerWidth > 768);
    const { products, debouncedSearch, showSearch } = useContext(shopDataContext);
    const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [sortType, setSortType] = useState("relevant");

    const getSubCategoriesForDisplay = () => {
        if (selectedCategories.length === 0) {
            return [];
        }
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

        if (showSearch && debouncedSearch) {
            const lowercasedSearch = debouncedSearch.toLowerCase();
            currentProducts = currentProducts.filter(item =>
                item.name.toLowerCase().includes(lowercasedSearch) ||
                item.category.toLowerCase().includes(lowercasedSearch) ||
                (item.subCategory && item.subCategory.toLowerCase().includes(lowercasedSearch))
            );
        }

        if (selectedCategories.length > 0) {
            currentProducts = currentProducts.filter(item => selectedCategories.includes(item.category));
        }

        if (selectedSubCategories.length > 0) {
            currentProducts = currentProducts.filter(item => selectedSubCategories.includes(item.subCategory));
        }

        if (sortType === "low-high") {
            currentProducts.sort((a, b) => a.price - b.price);
        } else if (sortType === "high-low") {
            currentProducts.sort((a, b) => b.price - a.price);
        }

        setFilteredAndSortedProducts(currentProducts);
    }, [products, selectedCategories, selectedSubCategories, sortType, debouncedSearch, showSearch]);

    useEffect(() => {
        setSelectedSubCategories(prevSubCats => {
            const validSubCategories = prevSubCats.filter(subCat => {
                return selectedCategories.some(selCat => (categoryOptions[selCat] || []).includes(subCat));
            });
            return validSubCategories.length === prevSubCats.length ? prevSubCats : validSubCategories;
        });
    }, [selectedCategories]);

    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(cat => cat !== category)
                : [...prev, category]
        );
    };

    const handleSubCategoryChange = (subCategory) => {
        setSelectedSubCategories(prev =>
            prev.includes(subCategory)
                ? prev.filter(subCat => subCat !== subCategory)
                : [...prev, subCategory]
        );
    };

    const handleSortChange = (event) => {
        setSortType(event.target.value);
    };

    return (
        <div className='w-full min-h-screen bg-gradient-to-r from-[#f3d9c8] to-[#e8cbb3] pt-[70px] overflow-x-hidden z-[2] pb-[70px]'>
            {/* Google Font for the Title */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />

            <div className="flex flex-col md:grid md:grid-cols-[30vw_1fr] lg:grid-cols-[20vw_1fr] min-h-[calc(100vh-70px)]">
                {/* Filters Sidebar */}
                <div className={`w-full md:min-h-screen p-5 border-r-[1px] border-[#141414] text-[#0b0c28] transition-all duration-300 ease-in-out md:block ${showFilter ? "h-auto" : "h-auto overflow-hidden"}`}>
                    <p className='text-2xl font-semibold flex gap-2 items-center justify-between cursor-pointer' onClick={() => setShowFilter(prev => !prev)}>
                        FILTERS
                        <span className='md:hidden'>
                            {showFilter ? <FaChevronDown className='text-lg' /> : <FaChevronRight className='text-lg' />}
                        </span>
                    </p>
                    <div className={`mt-6 space-y-6 ${showFilter ? "block" : "hidden"} md:block`}>
                        <div className="border-[2px] border-[#141414] p-4 rounded-lg bg-[#e6b892]">
                            <p className='text-lg text-[#180f0f] font-semibold mb-3'>CATEGORIES</p>
                            <div className='w-full flex flex-col items-start gap-2'>
                                {Object.keys(categoryOptions).map((cat) => (
                                    <div
                                        key={cat}
                                        onClick={() => handleCategoryChange(cat)}
                                        className={`w-full text-left px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 text-sm font-medium ${selectedCategories.includes(cat) ? 'bg-[#82664e] text-white' : 'hover:bg-[#dbac83]'}`}
                                    >
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {selectedCategories.length > 0 && (
                            <div className="border-[2px] border-[#141414] p-4 rounded-lg bg-[#e6b892]">
                                <p className='text-lg text-[#180f0f] font-semibold mb-3'>
                                    SUB-CATEGORIES
                                </p>
                                <div className='w-full flex flex-col items-start gap-2'>
                                    {subCategoriesToDisplay.map((subCat) => (
                                        <div
                                            key={subCat}
                                            onClick={() => handleSubCategoryChange(subCat)}
                                            className={`w-full text-left px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 text-sm font-medium ${selectedSubCategories.includes(subCat) ? 'bg-[#82664e] text-white' : 'hover:bg-[#dbac83]'}`}
                                        >
                                            {subCat}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Display Area */}
                <div className='w-full p-4'>
                    <div className='w-full p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
                        <div className='self-start' style={{ fontFamily: "'Playfair Display', serif" }}>
                             <Title text1={"ALL"} text2={"COLLECTIONS"} />
                        </div>
                        <div className="relative w-full sm:w-auto">
                            <select
                                name="sortBy"
                                id="sortBy"
                                className='block appearance-none w-full sm:w-[200px] h-10 px-3 text-sm bg-[#e6b892] text-[#180f0f] font-medium rounded-lg border-2 border-[#141414] hover:bg-[#dbac83] hover:border-[#82664e] focus:outline-none focus:ring-2 focus:ring-[#82664e]/50 cursor-pointer transition-all duration-300 pr-8'
                                value={sortType}
                                onChange={handleSortChange}
                            >
                                <option value="relevant">Sort By: Relevant</option>
                                <option value="low-high">Price: Low to High</option>
                                <option value="high-low">Price: High to Low</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#141414]">
                                <FaChevronDown className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                    <div className='w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 p-4'>
                        {filteredAndSortedProducts.length > 0 ? (
                            filteredAndSortedProducts.map((item) => (
                                <Card
                                    key={item._id}
                                    name={item.name}
                                    image1={item.image1}
                                    image3={item.image3}
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

                    {/* --- NEW: Concluding Paragraph --- */}
                    <div className="w-full text-center px-4 md:px-8 py-10 mt-8">
                        <h3 className="text-2xl text-[#5a4a42] font-semibold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Discover Your Signature Style
                        </h3>
                        <p className="text-[#6d5b5b] max-w-3xl mx-auto leading-relaxed">
                            Our collections are more than just clothing and gear; they are a statement of individuality. Each piece is thoughtfully curated to blend timeless design with modern functionality. Whether you're updating your wardrobe, gearing up for an adventure, or finding that perfect accessory, you'll find quality and style in every item. Explore the possibilities and let your journey begin with us.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collections;
