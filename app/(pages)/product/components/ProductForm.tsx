"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";
import { Textarea } from "@/app/components/ui/text-area";

interface Tax {
  tax_id: number;
  tax_name: string;
}

interface Discount {
  discount_id: number;
  discount_type: string;
  discount_value: string;
}

interface Product {
  product_name: string;
  description: string;
  price: number;
  tax_id?: number | null;
  discount_id?: number | null;
}

const ProductForm: React.FC = () => {
  const [product_name, setProductName] = useState<string>("");
  const [product_description, setProductDescription] = useState<string>("");
  const [unit_price, setUnitPrice] = useState<number>(0);
  const [tax_id, setTaxId] = useState<number | null>(null);
  const [discount_id, setDiscountId] = useState<number | null>(null);
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taxResponse = await axios.get("http://localhost:5000/taxes");
        const discountResponse = await axios.get("http://localhost:5000/discounts");
        const productResponse = await axios.get("http://localhost:5000/products");
        setTaxes(taxResponse.data.data);
        setDiscounts(discountResponse.data.data);
        setProducts(productResponse.data);
      } catch (error) {
        setError("Failed to fetch data.");
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product_name || !product_description || unit_price <= 0 || unit_price > 10000) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    const newProduct = {
      product_name,
      description: product_description,
      price: unit_price,
      tax_id,
      discount_id,
    };

    try {
      const response = await axios.post("http://localhost:5000/products", newProduct);
      setProducts([...products, response.data]);
      setMessage("Product added successfully.");
      setError("");
    } catch (error) {
      setError("Failed to add product.");
      setMessage("");
    }
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
              min={0.01}
              max={10000}
            />
          </div>
          <div>
            <Label htmlFor="tax_id">Tax</Label>
            <Select onValueChange={(value) => setTaxId(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Tax" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {taxes.map((tax) => (
                    <SelectItem key={tax.tax_id} value={tax.tax_id.toString()}>
                      {tax.tax_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="discount_id">Discount</Label>
            <Select onValueChange={(value) => setDiscountId(parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Discount" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {discounts.map((discount) => (
                    <SelectItem
                      key={discount.discount_id}
                      value={discount.discount_id.toString()}
                    >
                      {discount.discount_type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Add Product</Button>
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
