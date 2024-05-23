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
  


  return (
    <Card
    id="my-component.pdf"
    className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
  >
    <CardHeader className="flex flex-row items-start bg-muted/50">
      <div className="grid gap-0.5" >
        <CardTitle className="group flex items-center gap-2 text-lg">
          Order Oe31b70H
          <Button
            size="icon"
            variant="outline"
            className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Copy className="h-3 w-3" />
            <span className="sr-only">Copy Order ID</span>
          </Button>
        </CardTitle>
        <CardDescription>Date: November 23, 2023</CardDescription>
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
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Game 1 x <span>2</span>
            </span>
            <span>250.00 birr</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Game 2 x <span>1</span>
            </span>
            <span>490000.00 birr</span>
          </li>
        </ul>
        <Separator className="my-2" />
        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>299.00 birr</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Delivery</span>
            <span>5.00 birr</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Tax</span>
            <span>25.00 birr</span>
          </li>
          <li className="flex items-center justify-between font-semibold">
            <span className="text-muted-foreground">Total</span>
            <span>329.00 birr</span>
          </li>
        </ul>
      </div>
      <Separator className="my-4" />
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-3">
          <div className="font-semibold">Develiver Information</div>
          <address className="grid gap-0.5 not-italic text-muted-foreground">
            <span>Wesen Michael</span>
            <span>1234 </span>
            <span>sole, CA 12345</span>
          </address>
        </div>
        <div className="grid auto-rows-max gap-3">
          <div className="font-semibold">Billing Information</div>
          <div className="text-muted-foreground">
            Same as delivery address
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="grid gap-3">
        <div className="font-semibold">Customer Information</div>
        <dl className="grid gap-3">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Customer</dt>
            <dd>Liam Johnson</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Email</dt>
            <dd>
              <a href="mailto:">liam@acme.com</a>
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Phone</dt>
            <dd>
              <a href="tel:">+251 234 567 890</a>
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
             Cbe
            </dt>
            <dd>**** **** **** 4532</dd>
          </div>
        </dl>
      </div>
    </CardContent>
    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
      <div className="text-xs text-muted-foreground">
        Updated <time dateTime="2023-11-23">November 23, 2023</time>
      </div>
      <Pagination className="ml-auto mr-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <Button size="icon" variant="outline" className="h-6 w-6">
              <ChevronLeft className="h-3.5 w-3.5" />
              <span className="sr-only">Previous Order</span>
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button size="icon" variant="outline" className="h-6 w-6">
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="sr-only">Next Order</span>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </CardFooter>
  </Card>
  )
}

export default InvoiceSheet