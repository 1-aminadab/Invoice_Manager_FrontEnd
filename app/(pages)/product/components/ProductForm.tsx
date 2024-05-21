'use client'
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Select, SelectGroup, SelectItem } from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/text-area";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
// Define interfaces for tax and discount objects
interface Tax {
  tax_id: number;
  tax_name: string;
}

interface Discount {
  discount_id: number;
  discount_name: string;
}

const ProductForm: React.FC = () => {
  const [product_name, setProductName] = useState<string>("");
  const [product_description, setProductDescription] = useState<string>("");
  const [unit_price, setUnitPrice] = useState<number>(0);
  const [tax_id, setTaxId] = useState<number | null>(null);
  const [discount_id, setDiscountId] = useState<number | null>(null);
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);

  useEffect(() => {
    axios
      .get<Tax[]>("/api/taxes")
      .then((response: AxiosResponse<Tax[]>) => setTaxes(response.data));

    axios
      .get<Discount[]>("/api/discounts")
      .then((response: AxiosResponse<Discount[]>) =>
        setDiscounts(response.data)
      );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      product_name,
      product_description,
      unit_price,
      tax_id,
      discount_id,
    };
    await axios.post("/api/products", newProduct);
    // Optionally refresh product list or reset form
  };

  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="product_name">Product Name</Label>
            <Input
              id="product_name"
              value={product_name}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="product_description">Product Description</Label>
            <Textarea
              id="product_description"
              value={product_description}
              onChange={(e) => setProductDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="unit_price">Unit Price</Label>
            <Input
              id="unit_price"
              type="number"
              value={unit_price}
              onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
              required
            />
          </div>
          <div>
            <Label htmlFor="tax_id">Tax</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="discount">
                  Select Tax
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[{tax_id:1, tax_name:"tax"}].map((tax) => (
                    <SelectItem
                      key={tax.tax_id}
                      value={tax.tax_id.toString()}
                    >
                      {tax.tax_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="discount_id">Discount</Label>
            <Select
              
            >
              <SelectTrigger>
                <SelectValue placeholder="discount">
                  Select Discount
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {discounts.map((discount) => (
                    <SelectItem
                      key={discount.discount_id}
                      value={discount.discount_id.toString()}
                    >
                      {discount.discount_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Add Product</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
