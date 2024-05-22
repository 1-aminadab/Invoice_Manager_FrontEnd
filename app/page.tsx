'use client'
import { Button } from "./components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu"

import { Progress } from "./components/ui/progress"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs"

import FromTo from "./(pages)/home/from-to"

import XLSX from 'xlsx';
import { useState } from "react"
import { jsPDF } from 'jspdf';
import PaymentForm from "./(pages)/product/components/PaymentFrom"
import InvoiceForm from "./(pages)/product/components/InvoiceItems"
import CustomList from "./components/templates/List"
import Sidebar from "./components/templates/Sidebar"
import Navbar from "./components/templates/Navbar"
import InvoiceSheet from "./components/templates/InvoiceSheet"
import { File, ListFilter } from "lucide-react"

export default function HomeMain() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const generatePdf = () => {
    const doc = new jsPDF();
    const content:any = document.getElementById('content-to-convert')?.innerHTML;
     // Replace with your content selector
    doc.text(content, 10, 10);
    doc.save('my-component.pdf');
  };
 

  const handleDownloadAsExcel = () => {
    const element = document.getElementById('content-to-download');
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.table_to_sheet(element);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
    XLSX.writeFile(workbook, 'data.xlsx');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar/>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
       <Navbar/>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Invoice Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Create New Invoice</Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="text-4xl">20</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    40 from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-4xl">100</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    80 from last month
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger className="data-[state=active]:bg-white" value="from">From/To</TabsTrigger>
                  <TabsTrigger className="data-[state=active]:bg-white" value="detail">Invoice Detail</TabsTrigger>
                  <TabsTrigger className="data-[state=active]:bg-white" value="line">Line Item</TabsTrigger>
                  <TabsTrigger className="data-[state=active]:bg-white" value="payment">Payment Info</TabsTrigger>
                  <TabsTrigger className="data-[state=active]:bg-white" value="summery">Summery</TabsTrigger>

                </TabsList>
                
              </div>
              <TabsContent value="from">
                <FromTo />
              </TabsContent>
              <TabsContent value="payment">
                <PaymentForm/>
              </TabsContent>
              <TabsContent value="line">
                <InvoiceForm/>
              </TabsContent>
              <TabsContent value="detail">
               <CustomList/>
              </TabsContent>
            </Tabs>
          </div>
          <div>
          <button onClick={generatePdf}>Download PDF</button>
            <InvoiceSheet/>
          </div>
        </main>
      </div>
    </div>
  )
}


