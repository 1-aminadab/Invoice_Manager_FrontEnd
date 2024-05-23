'use client'
import ProductForm from './components/ProductForm';
import ListSlider from './components/ListSlider';
import TaxForm from './components/TaxesFrom';
import DiscountForm from './components/Discount';
import Sidebar from '@/app/components/templates/Sidebar';
import Navbar from '@/app/components/templates/Navbar';

const HomePage = () => {
    return (
        <div className="container mx-auto m-3 w-[100%] min-h[100vh] ">
            <Sidebar/>
            <Navbar/>
            <div className='flex w-[100%] gap-2 p-4 '>
                 <ProductForm />
                 <div className='flex flex-col gap-2'>
                     <TaxForm refresh={()=>{}}/>
            <DiscountForm refresh={()=>{}}/>
                 </div>
           
            </div>
           
            {/* <ListSlider endpoint="/api/products" title="Products" />
            <ListSlider endpoint="/api/taxes" title="Taxes" />
            <ListSlider endpoint="/api/discounts" title="Discounts" /> */}
        </div>
    );
};

export default HomePage;
