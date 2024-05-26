'use client'
import React, { useRef } from 'react'
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { ChevronLeft, ChevronRight, Copy, CreditCard, FileUp, MoreVertical, Truck } from 'lucide-react'
import { Separator } from '../ui/separator'
import { Pagination, PaginationContent, PaginationItem } from '../ui/pagination'

import { useReactToPrint } from 'react-to-print';
import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux'
import { RootState } from '@/app/lib/store'
import { getProduct, invoiceCalculator } from '@/app/lib/calculator/invoice'

interface PrintableProps {
    content: React.ReactElement;
  }

  const data = {
    billTo: [
      { id: 1, name: "Customer A", address: "123 Main St, City A" },
      { id: 2, name: "Customer B", address: "456 Oak St, City B" }
    ],
    billFrom: [
      { id: 1, name: "Supplier X", address: "789 Pine St, City X" },
      { id: 2, name: "Supplier Y", address: "101 Maple St, City Y" }
    ],
    items: [
      { productId: 1, description: "Product 1", quantity: 10, price: 5.00 },
      { productId: 2, description: "Product 2", quantity: 20, price: 15.00 }
    ]
  };
function InvoiceSheet() {
  const {newPayment, newInvoiceItems,invoiceCustomer} = useSelector((store:RootState)=>store.invoice)
  const {user} = useSelector((store:RootState)=>store.user)
  const productIds = newInvoiceItems.map((item)=>{
    return {
      id:item.product_id,
      quantity: item.quantity
    }
  })
  const priceSummery = invoiceCalculator(productIds)
    // handle pdf downlaod 
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
  // handle excel download
  const fileName = 'invoice';

  // Create worksheets from the data
  const itemsSheet = XLSX.utils.json_to_sheet(data.items, { header: ["productId", "description", "quantity", "price"] });
  const billToSheet = XLSX.utils.json_to_sheet(data.billTo, { header: ["id", "name", "address"] });
  const billFromSheet = XLSX.utils.json_to_sheet(data.billFrom, { header: ["id", "name", "address"] });
  
  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  
  // Append sheets to the workbook
  XLSX.utils.book_append_sheet(workbook, billToSheet, 'Bill To');
  XLSX.utils.book_append_sheet(workbook, billFromSheet, 'Bill From');
  XLSX.utils.book_append_sheet(workbook, itemsSheet, 'Items');
  
  // Write the workbook to a buffer
  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  
  // Handle download
  const handleDownload = () => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.xlsx`;
    link.click();
  };
  
  function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <Card
    id="my-component.pdf"
    className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
  >
    <CardHeader className="flex flex-row items-start bg-muted/50">
      <div className="grid gap-0.5" >
        <CardTitle className="group flex items-center gap-2 text-lg">
          Invoice Sheet
          <Button
            size="icon"
            variant="outline"
            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Copy className="h-3 w-3" />
            <span className="sr-only">Copy Order ID</span>
          </Button>
        </CardTitle>
        <CardDescription>Date: {formatDate(new Date())}</CardDescription>
      </div>
      <div className="ml-auto flex items-center gap-1">
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <FileUp className="h-3.5 w-3.5" />
          <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
            Export as
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="h-8 w-8">
              <MoreVertical className="h-3.5 w-3.5" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className='cursor-pointer' onClick={handlePrint}>Pdf</DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={handleDownload}>Excel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>
    <CardContent  ref={componentRef} className="p-6 text-sm">
      <div className="grid gap-3"  id="content-to-download">
        <div className="font-semibold">Invoice Details</div>
        <ul className="grid gap-3">
          {
            newInvoiceItems.map((item, index)=>{
              return (
                 <li key={index} className="flex items-center justify-between">
            <span className="text-muted-foreground">
              {getProduct(item.product_id)?.product_name}
            </span>
            <span>{item.quantity} items</span>
            <span>{item.total_price} birr</span>
          </li>
              )
            })
          }
         
         
        </ul>
        <Separator className="my-2" />
        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{priceSummery.subTotal} birr</span>
          </li>
          
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>{priceSummery.taxAmount} birr</span>
          </li>
          <li className="flex items-center justify-between font-semibold">
            <span className="text-muted-foreground">Total</span>
            <span>{priceSummery.totalAmount}birr</span>
          </li>
        </ul>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-3">
          <div className="font-semibold">owner information</div>
          <address className="grid gap-0.5 not-italic text-muted-foreground">
            <span>{user?.first_name} {user?.last_name}</span>
            <span>{user?.phoneNumber}</span>
            <span>{user?.city}</span>
            <span>{user?.address}</span>
          </address>
        </div>
        <div className="grid auto-rows-max gap-3">
          <div className="font-semibold">Billing Information</div>
          {/* <div className="text-muted-foreground">
            Same as delivery address
          </div> */}
        </div>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-3">
        <div className="font-semibold">Customer Information</div>
        <dl className="grid gap-3">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Customer</dt>
            <dd>{invoiceCustomer?.first_name} {invoiceCustomer?.last_name}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Email</dt>
            <dd>
              <a href="mailto:">{invoiceCustomer?.email}</a>
            </dd>
          </div>
          <div>
            <dd>
              <a href="tel:">{invoiceCustomer?.address}</a>
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Phone</dt>
            <dd>
              <a href="tel:">{invoiceCustomer?.phoneNumber}</a>
            </dd>
          </div>
        </dl>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-3">
        <div className="font-semibold">Payment Information</div>
        <dl className="grid gap-3">
          <div className="flex items-center justify-between">
            <dt className="flex items-center gap-1 text-muted-foreground">
              <CreditCard className="h-4 w-4" />
             {newPayment?.payment_method}
            </dt>
            <dd>{newPayment?.payment_amount} birr</dd>
            <dd>{newPayment?.payment_status}</dd>
          </div>
        </dl>
      </div>
    </CardContent>
    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
      <div className="text-xs text-muted-foreground">
        Updated <time dateTime="2023-11-23">November 23, {new Date().getFullYear()}</time>
      </div>
      
    </CardFooter>
  </Card>
  )
}

export default InvoiceSheet