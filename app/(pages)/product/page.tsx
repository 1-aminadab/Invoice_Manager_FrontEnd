'use client'
import ProductForm from './components/ProductForm';
import ListSlider from './components/ListSlider';
import TaxForm from './components/TaxesFrom';
import DiscountForm from './components/Discount';

const HomePage = () => {
    return (
        <div className="container mx-auto p-4 w-[100%]">
            <div className='flex w-[100%] gap-2'>
                 <ProductForm />
                 <div className='flex flex-col gap-2'>
                     <TaxForm refresh={()=>{}}/>
            <DiscountForm refresh={()=>{}}/>
                 </div>
           
            </div>
           
            <ListSlider endpoint="/api/products" title="Products" />
            <ListSlider endpoint="/api/taxes" title="Taxes" />
            <ListSlider endpoint="/api/discounts" title="Discounts" />
        </div>
    );
};

export default HomePage;
