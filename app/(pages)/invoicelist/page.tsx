// InvoiceComponent.tsx
'use client'
import React, { useEffect, useState } from 'react';
import {
  fetchInvoices,
  fetchInvoiceById,
  deleteInvoice,
  updateInvoice,
  Invoice,
} from './api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/ui/tooltip';

export default function InvoiceComponent() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInvoices() {
      setLoading(true);
      const invoices = await fetchInvoices();
      console.log(invoices);
      
      setInvoices(invoices.data);
      setLoading(false);
    }

    loadInvoices();
  }, []);

  const handleDeleteInvoice = async (id: number) => {
    await deleteInvoice(id);
    setInvoices(invoices.filter((invoice) => invoice.invoice_id !== id));
  };

  const handleUpdateInvoice = async (id: number, updatedData: Partial<Invoice>) => {
    const updatedInvoice = await updateInvoice(id, updatedData);
    setInvoices(invoices.map((invoice) => (invoice.invoice_id === id ? updatedInvoice : invoice)));
  };

  const handleSelectInvoice = async (id: number) => {
    const invoice = await fetchInvoiceById(id);
    setSelectedInvoice(invoice);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="relative ml-auto flex-1 md:grow-0">
          <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" />
        </div>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices && invoices.map((invoice) => (
                  <TableRow key={invoice.invoice_id}>
                    <TableCell>{invoice.invoice_number}</TableCell>
                    <TableCell><Badge variant="outline">{invoice.status}</Badge></TableCell>
                    <TableCell>{invoice.total_amount}</TableCell>
                    <TableCell>{new Date(invoice.due_date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleSelectInvoice(invoice.invoice_id)}>View/Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteInvoice(invoice.invoice_id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-10</strong> of <strong>{invoices.length}</strong> invoices
            </div>
          </CardFooter>
        </Card>
        {selectedInvoice && (
          <Card>
            <CardHeader>
              <CardTitle>Edit Invoice</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Form for updating invoice */}
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  const updatedData: Partial<Invoice> = {
                    status: formData.get('status') as string,
                    // Add other fields as necessary
                  };
                  await handleUpdateInvoice(selectedInvoice.invoice_id, updatedData);
                  setSelectedInvoice(null);
                }}
              >
                <div>
                  <label>Status</label>
                  <Input name="status" defaultValue={selectedInvoice.status} />
                </div>
                <Button type="submit">Update</Button>
              </form>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
