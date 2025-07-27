import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { shopDataContext } from '../context/ShopContext.jsx';
import Card from '../component/Card.jsx';
import RelatedProduct from '../component/RelatedProduct.jsx';
import { toast } from 'react-toastify';

// --- HELPER COMPONENTS (No changes needed) ---
const Breadcrumb = ({ product }) => ( <div className="text-sm text-stone-600 mb-6"> <span className="hover:text-orange-500 cursor-pointer">Home</span> <span className="mx-2">/</span> <span className="hover:text-orange-500 cursor-pointer">Shop</span> <span className="mx-2">/</span> <span className="font-semibold text-stone-800 truncate">{product.name}</span> </div> );
const MainImage = ({ image }) => ( <div className="group w-full aspect-square rounded-xl overflow-hidden bg-white flex items-center justify-center border border-gray-200/80 shadow-lg hover:shadow-xl"> <img src={image} alt="Main product" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x600/f3e9e3/4a4a4a?text=Image+Not+Found'; }}/> </div> );
const ThumbnailGallery = ({ images, mainImage, setMainImage }) => ( <div className="grid grid-cols-4 gap-4"> {images.map((img, index) => ( img && <div key={index} className={`w-full aspect-square cursor-pointer rounded-lg overflow-hidden ${mainImage === img ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-white scale-105' : 'opacity-60 hover:opacity-100 hover:scale-105'}`} onClick={() => setMainImage(img)}> <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/f3e9e3/4a4a4a?text=Thumb'; }}/> </div> ))} </div> );
const AccordionItem = ({ title, children }) => { const [isOpen, setIsOpen] = useState(false); return ( <div className="border-b border-stone-200 py-4"> <button className="w-full flex justify-between items-center text-left text-lg font-semibold text-stone-800" onClick={() => setIsOpen(!isOpen)}> <span>{title}</span> <svg className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path> </svg> </button> <div className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-screen pt-4' : 'max-h-0'}`}> <div className="text-stone-600 text-base leading-relaxed whitespace-pre-line">{children}</div> </div> </div> ); };

const SizeChartModal = ({ isOpen, onClose }) => {
    const [unit, setUnit] = useState('in'); // 'in' for Inches, 'cms' for Centimeters

    const sizeData = {
        in: [
            { size: 'S', chest: '42.0', front_length: '29.0', sleeve_length: '9.75' },
            { size: 'M', chest: '44.0', front_length: '29.75', sleeve_length: '10.0' },
            { size: 'L', chest: '46.0', front_length: '30.5', sleeve_length: '10.25' },
            { size: 'XL', chest: '48.0', front_length: '31.25', sleeve_length: '10.5' },
            { size: '2XL', chest: '50.0', front_length: '32.0', sleeve_length: '10.75' },
        ],
        cms: [
            { size: 'S', chest: '106.7', front_length: '73.7', sleeve_length: '24.8' },
            { size: 'M', chest: '111.8', front_length: '75.6', sleeve_length: '25.4' },
            { size: 'L', chest: '116.8', front_length: '77.5', sleeve_length: '26.0' },
            { size: 'XL', chest: '121.9', front_length: '79.4', sleeve_length: '26.7' },
            { size: '2XL', chest: '127.0', front_length: '81.3', sleeve_length: '27.3' },
        ]
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex justify-center items-center z-50 p-4 overflow-y-auto"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent black backdrop
            }}
        >
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 focus:outline-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                <div className="flex flex-col items-center mb-6">
                    <p className="text-xl font-bold text-stone-800">T-Shirt Size Diagram</p>
                    <p className="text-sm text-gray-600">(Standard Size Chart)</p>
                </div>
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setUnit('in')}
                        className={`py-2 px-6 rounded-l-md text-lg font-semibold border ${
                            unit === 'in' ? 'bg-black text-white border-black' : 'bg-white text-stone-700 border-gray-300 hover:bg-gray-100'
                        }`}
                    >
                        In
                    </button>
                    <button
                        onClick={() => setUnit('cms')}
                        className={`py-2 px-6 rounded-r-md text-lg font-semibold border ${
                            unit === 'cms' ? 'bg-black text-white border-black' : 'bg-white text-stone-700 border-gray-300 hover:bg-gray-100'
                        }`}
                    >
                        Cms
                    </button>
                </div>
                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-stone-700 text-sm">
                                <th className="py-3 px-4 border-b-2 border-gray-200">Size</th>
                                <th className="py-3 px-4 border-b-2 border-gray-200">Chest ({unit === 'in' ? 'In Inch' : 'In Cms'})</th>
                                <th className="py-3 px-4 border-b-2 border-gray-200">Front Length ({unit === 'in' ? 'In Inch' : 'In Cms'})</th>
                                <th className="py-3 px-4 border-b-2 border-gray-200">Sleeve Length ({unit === 'in' ? 'In Inch' : 'In Cms'})</th>
                            </tr>
                        </thead>
                        {/* --- FIX APPLIED HERE --- */}
                        <tbody>{
                            sizeData[unit].map((row, index) => (
                                <tr key={row.size} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-100 last:border-b-0`}>
                                    <td className="py-3 px-4">{row.size}</td>
                                    <td className="py-3 px-4">{row.chest}</td>
                                    <td className="py-3 px-4">{row.front_length}</td>
                                    <td className="py-3 px-4">{row.sleeve_length}</td>
                                </tr>
                            ))
                        }</tbody>
                    </table>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">
                    All measurements are approximate and may vary slightly.
                </p>
            </div>
        </div>
    );
};

const OptionSelector = ({ product, selectedOption, setSelectedOption, onOpenSizeChart }) => {
    const clothingSizes = ['S', 'M', 'L', 'XL', 'XXL'];
    let options = [];
    let label = "Select Option";
    let showSizeChartButton = false;
    const category = product.category?.toLowerCase() || '';

    if (category === 'men') {
        options = clothingSizes;
        label = "Select Size:";
        showSizeChartButton = true;
    }

    if (options.length === 0) return null;

    return (
        <div className="my-6">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-md font-semibold">{label}</h2>
                {showSizeChartButton && (
                    <button onClick={onOpenSizeChart} className="text-sm font-medium text-orange-600 hover:underline">Size Chart</button>
                )}
            </div>
            <div className="flex flex-wrap gap-3">
                {options.map(option => (
                    <button
                        key={option}
                        onClick={() => setSelectedOption(option)}
                        className={`px-6 h-14 flex items-center justify-center rounded-full border-2 font-semibold transition-all duration-200 ${
                            selectedOption === option
                                ? 'bg-stone-900 text-white border-stone-900 scale-110 shadow-lg'
                                : 'bg-white text-stone-800 border-stone-300 hover:border-stone-900 hover:text-white hover:bg-stone-800'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

const ProductInfo = ({ product, currency, selectedOption, setSelectedOption }) => {
    const { addToCart, loading } = useContext(shopDataContext);
    const [isSizeChartOpen, setSizeChartOpen] = useState(false);

    const handleAddToCart = () => {
        const productCategory = product.category?.toLowerCase();
        const requiresOption = productCategory === 'men';

        if (requiresOption && !selectedOption) {
            toast.warn("Please select a size first!");
            return;
        }
        
        addToCart(product.id || product._id, selectedOption);
    };

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl md:text-4xl font-bold text-stone-800 mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4 my-4">
                <span className="text-3xl font-bold">{currency}{product.price || product.new_price}</span>
                {(product.mrp || product.old_price) && (
                    <span className="text-lg text-stone-400 line-through">{currency}{product.mrp || product.old_price}</span>
                )}
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                    {product.mrp && product.price ?
                        Math.round(((product.mrp - product.price) / product.mrp) * 100) :
                        (product.old_price && product.new_price ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100) : 'N/A')
                    }% OFF
                </span>
            </div>

            <OptionSelector product={product} selectedOption={selectedOption} setSelectedOption={setSelectedOption} onOpenSizeChart={() => setSizeChartOpen(true)} />

            <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-3 bg-stone-800 text-white font-bold py-4 rounded-xl text-lg hover:bg-orange-400 active:scale-95 shadow-lg hover:shadow-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
            >
                {loading ? ( <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg> ) : ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> )}
                {loading ? 'Adding...' : 'Add to Cart'}
            </button>

            <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 text-stone-600"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg> <span className="font-semibold">100% Original Product</span> </div>
                <div className="flex items-center gap-4 text-stone-600"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect><circle cx="12" cy="12" r="2"></circle></svg> <span className="font-semibold">Cash on delivery is available</span> </div>
                <div className="flex items-center gap-4 text-stone-600"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg> <span className="font-semibold">Easy 7-day return and exchange policy</span> </div>
            </div>

            <div className="mt-4">
                {product.description && (<AccordionItem title="Description"><p>{product.description}</p></AccordionItem>)}
                {product.details && (<AccordionItem title="Product Details"><p>{product.details}</p></AccordionItem>)}
                {product.care && (<AccordionItem title="Care Instructions"><p>{product.care}</p></AccordionItem>)}
            </div>
            <SizeChartModal isOpen={isSizeChartOpen} onClose={() => setSizeChartOpen(false)} />
        </div>
    );
};

// --- MAIN PRODUCT DETAIL COMPONENT ---
function ProductDetail() {
    const context = useContext(shopDataContext);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [imageGallery, setImageGallery] = useState([]);

    useEffect(() => {
        if (context && context.products && context.products.length > 0) {
            const foundProduct = context.products.find((p) => String(p.id) === String(id) || String(p._id) === String(id));
            if (foundProduct) {
                setProduct(foundProduct);
                const mainImageUrl = foundProduct.image1;
                if (mainImageUrl) {
                    setMainImage(mainImageUrl);
                    setImageGallery([
                        foundProduct.image1,
                        foundProduct.image2,
                        foundProduct.image3,
                        foundProduct.image4
                    ].filter(Boolean));
                }
            } else {
                console.warn(`Product with ID ${id} not found.`);
            }
        }
    }, [context.products, id]);

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-stone-700">Loading Product...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-[#fbeee6] via-[#f3d9c8] to-[#e8cbb3] min-h-screen pt-8 sm:pt-12 pb-32 overflow-x-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumb product={product} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="flex flex-col gap-5 p-4 sm:p-6 rounded-2xl bg-[#3b3131ee] backdrop-blur-sm border border-[#141414] shadow-sm">
                        <MainImage image={mainImage} />
                        <ThumbnailGallery images={imageGallery} mainImage={mainImage} setMainImage={setMainImage} />
                    </div>
                    <div className="py-4">
                        <ProductInfo
                            product={product}
                            currency={context.currency}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                        />
                    </div>
                </div>
                {product.category && (
                    <RelatedProduct category={product.category} currentProductId={product.id || product._id} />
                )}
            </div>
        </div>
    );
}

export default ProductDetail;