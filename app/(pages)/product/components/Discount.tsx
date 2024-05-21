"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { SelectContent, SelectItem } from "@radix-ui/react-select";

interface DiscountFormProps {
  refresh: () => void;
}

const DiscountForm: React.FC<DiscountFormProps> = ({ refresh }) => {
  const [discount_name, setDiscountName] = useState<string>("");
  const [discount_type, setDiscountType] = useState<string>("");
  const [discount_value, setDiscountValue] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDiscount = { discount_name, discount_type, discount_value };
    await axios.post("/api/discounts", newDiscount);
    refresh(); // Refresh the list of discounts
    // Optionally reset form fields
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <CardTitle>Add New Discount</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="discount_name">Discount Name</Label>
            <Input
              id="discount_name"
              value={discount_name}
              onChange={(e) => setDiscountName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="discount_type">Discount Type</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="discount">Select Tax</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="sdffd">Select Discount Type</SelectItem>
                  <SelectItem value="Percentage">Percentage</SelectItem>
                  <SelectItem value="Fixed Amount">Fixed Amount</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="discount_value">Discount Value</Label>
            <Input
              id="discount_value"
              type="number"
              value={discount_value}
              onChange={(e) => setDiscountValue(parseFloat(e.target.value))}
              required
            />
          </div>
          <Button type="submit">Add Discount</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DiscountForm;
