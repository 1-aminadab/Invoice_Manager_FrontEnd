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
import { Button } from "@/app/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/app/components/ui/select";  // Updated import
import { getDiscountsAPI } from "@/app/apis";
import { RootState } from "@/app/lib/store";
import { useSelector } from "react-redux";

interface Discount {
  discount_id?: number;
  discount_type: string;
  discount_value: number;
}

const DiscountForm: React.FC = () => {
  const {user} = useSelector((store:RootState)=>store.user)
  const [discount_type, setDiscountType] = useState<string>("");
  const [discount_value, setDiscountValue] = useState<number>(0);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await getDiscountsAPI()
        setDiscounts(response.data);
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        setError("Failed to fetch discounts.");
      }
    };
    fetchDiscounts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDiscount = { discount_type, discount_value, discount_added_by:user?.user_id };
    try {
      const response = await axios.post("http://localhost:5000/discounts", newDiscount);
      setDiscounts([...discounts, response.data]);
      setMessage("Discount added successfully.");
      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to add discount.");
      setMessage("");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <CardTitle>Add New Discount</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="z-10">
            <Label htmlFor="discount_type">Discount Type</Label>
            <Select onValueChange={(value) => setDiscountType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Discount Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
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
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default DiscountForm;


