'use client'
import ProductForm from './components/ProductForm';
import ListSlider from './components/ListSlider';
import TaxForm from './components/TaxesFrom';
import DiscountForm from './components/Discount';
import Sidebar from '@/app/components/templates/Sidebar';
import Navbar from '@/app/components/templates/Navbar';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { useDispatch } from 'react-redux';
import { changeCurrentScreen } from '@/app/lib/features/InvoiceSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/store';
import ProductList from '@/app/components/templates/productLlist';
import ProductCard from '../../components/cards/productCard';

const HomePage = () => {
    const dispatch = useDispatch()
    const { currentScreen } = useSelector((store: RootState) => store.invoice)

    return (
        <div className="container mx-auto m-3 w-[100%] min-h[100vh] ">
            <Sidebar/>
            <Navbar/>
            <div className='flex w-[100%] gap-2 p-4 '>
                
                <div className='flex-1' >

                
            <Card
                className="w-fit sm:col-span-2" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Invoice Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className='shadow-md border border-white' onClick={() => dispatch(changeCurrentScreen(currentScreen === "list" ? "add" : "list"))}>{currentScreen === "list" ? "Create New Product" : "Show Product List"} </Button>
                </CardFooter>
              </Card>
              {
                currentScreen === "list" ?<div className='flex-1'><ProductList/></div>  : <ProductForm />
              }
              
                 
                 </div>
                 {
                       currentScreen === "list" ? <ProductCard/> : <div className='flex flex-col gap-2'>
                    
                    <TaxForm />
                    <DiscountForm />
                 </div>
                 }
                 
           
            </div>
           
            {/* <ListSlider endpoint="/api/products" title="Products" />
            <ListSlider endpoint="/api/taxes" title="Taxes" />
            <ListSlider endpoint="/api/discounts" title="Discounts" /> */}
        </div>
    );
};

export default HomePage;
