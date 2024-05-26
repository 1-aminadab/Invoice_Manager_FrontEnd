import { Tax } from "@/app/types/type";

export const productsList = [
    { product_id: 1, product_added_by: 1, product_name: 'Product 1', description: 'Description for Product 1', price: 10.00, tax_id: 1, discount_id: 1 },
    { product_id: 2, product_added_by: 2, product_name: 'Product 2', description: 'Description for Product 2', price: 20.00, tax_id: 2, discount_id: 2 },
    { product_id: 3, product_added_by: 3, product_name: 'Product 3', description: 'Description for Product 3', price: 30.00, tax_id: 3, discount_id: 3 },
    { product_id: 4, product_added_by: 4, product_name: 'Product 4', description: 'Description for Product 4', price: 40.00, tax_id: 4, discount_id: 4 },
    { product_id: 5, product_added_by: 5, product_name: 'Product 5', description: 'Description for Product 5', price: 50.00, tax_id: 5, discount_id: 5 },
    { product_id: 6, product_added_by: 6, product_name: 'Product 6', description: 'Description for Product 6', price: 60.00, tax_id: 6, discount_id: 6 },
    { product_id: 7, product_added_by: 7, product_name: 'Product 7', description: 'Description for Product 7', price: 70.00, tax_id: 7, discount_id: 7 },
    { product_id: 8, product_added_by: 8, product_name: 'Product 8', description: 'Description for Product 8', price: 80.00, tax_id: 8, discount_id: 8 },
    { product_id: 9, product_added_by: 9, product_name: 'Product 9', description: 'Description for Product 9', price: 90.00, tax_id: 9, discount_id: 9 },
    { product_id: 10, product_added_by: 10, product_name: 'Product 10', description: 'Description for Product 10', price: 100.00, tax_id: 10, discount_id: 10 }
  ];

export const taxesList = [
    { tax_id: 1, tax_added_by: 1, tax_name: 'Tax 1', tax_rate: 0.05 },
    { tax_id: 2, tax_added_by: 2, tax_name: 'Tax 2', tax_rate: 0.10 },
    { tax_id: 3, tax_added_by: 3, tax_name: 'Tax 3', tax_rate: 0.15 },
    { tax_id: 4, tax_added_by: 4, tax_name: 'Tax 4', tax_rate: 0.20 },
    { tax_id: 5, tax_added_by: 5, tax_name: 'Tax 5', tax_rate: 0.25 },
    { tax_id: 6, tax_added_by: 6, tax_name: 'Tax 6', tax_rate: 0.30 },
    { tax_id: 7, tax_added_by: 7, tax_name: 'Tax 7', tax_rate: 0.35 },
    { tax_id: 8, tax_added_by: 8, tax_name: 'Tax 8', tax_rate: 0.40 },
    { tax_id: 9, tax_added_by: 9, tax_name: 'Tax 9', tax_rate: 0.45 },
    { tax_id: 10, tax_added_by: 10, tax_name: 'Tax 10', tax_rate: 0.50 }
  ];

export const discountsList = [
    { discount_id: 1, discount_added_by: 1, discount_type: 'Percentage', discount_value: 0.05 },
    { discount_id: 2, discount_added_by: 2, discount_type: 'Percentage', discount_value: 0.10 },
    { discount_id: 3, discount_added_by: 3, discount_type: 'Percentage', discount_value: 0.15 },
    { discount_id: 4, discount_added_by: 4, discount_type: 'Percentage', discount_value: 0.20 },
    { discount_id: 5, discount_added_by: 5, discount_type: 'Percentage', discount_value: 0.25 },
    { discount_id: 6, discount_added_by: 6, discount_type: 'Fixed Amount', discount_value: 5.00 },
    { discount_id: 7, discount_added_by: 7, discount_type: 'Fixed Amount', discount_value: 10.00 },
    { discount_id: 8, discount_added_by: 8, discount_type: 'Fixed Amount', discount_value: 15.00 },
    { discount_id: 9, discount_added_by: 9, discount_type: 'Fixed Amount', discount_value: 20.00 },
    { discount_id: 10, discount_added_by: 10, discount_type: 'Fixed Amount', discount_value: 25.00 }
  ];
  

interface totalInvoice {
    id: number,
    quantity: number,
}

export const getTax = (id:number)=>{
    const selectedTax = taxesList.find((tax)=>tax.tax_id === id)
    if(selectedTax){
       return selectedTax 
    }
    return 
}

export const getDiscount = (id:number)=>{
    const selectedDiscount = discountsList.find((discount)=>discount.discount_id === id)
    if(selectedDiscount){
       return selectedDiscount 
    }
}


export const getProduct = (id:number)=>{
    const selectedProduct = productsList.find((discount)=>discount.discount_id === id)
    if(selectedProduct){
       return selectedProduct
    }
}

const getTaxAmmount = (id:number)=>{
    const selectedTax = getTax(id)
    if(selectedTax){
       return selectedTax.tax_rate  
    }
    return 0
   
}
const getTotalProductTax = (taxid:number,productPrice:number)=>{
    return getTaxAmmount(taxid) *  productPrice
}

export const invoiceCalculator = (items: totalInvoice[]) => {
    let result = {
        totalAmount: 0,
        taxAmount: 0,
        subTotal: 0
    }
    items.forEach((item) => {
        const selectedProduct = productsList.find((product) => product.product_id === item.id)

        if (selectedProduct) {
            const totalAmount = selectedProduct.price * item.quantity
            const taxAmount = getTotalProductTax(selectedProduct.tax_id, selectedProduct.price) * item.quantity 
            const subTotal = totalAmount + taxAmount

            result = {
                ...result,
                totalAmount: result.totalAmount + totalAmount,
                taxAmount: result.taxAmount + taxAmount,
                subTotal: result.subTotal + subTotal,
            }
        }

    })

    return result
}


