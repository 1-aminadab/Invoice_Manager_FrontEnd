"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardTitle } from "@/app/components/ui/card";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { getTaxesAPI } from "@/app/apis";
import { Tax } from "@/app/types/type";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";

const TaxForm: React.FC = () => {
  const {user} = useSelector((store:RootState)=>store.user)
  const [tax_name, setTaxName] = useState<string>("");
  const [tax_rate, setTaxRate] = useState<number>(0);
  const [taxes, setTaxes] = useState<Tax[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
 
  useEffect(() => {
    const fetchTaxes = async () => {
      try {
        const response = await getTaxesAPI()
        setTaxes(response.data);
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
      } catch (error) {
        setError("Failed to fetch taxes.");
      }
    };
    fetchTaxes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    const newTax = { tax_name, tax_rate,tax_added_by:user?.user_id };

    try {
      const response = await axios.post("http://localhost:5000/taxes", newTax);
      //setTaxes([...taxes, response.data]);
      setMessage("Tax added successfully.");
      setError("");
    } catch (error) {
      setError("Failed to add tax.");
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      setMessage("");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <CardTitle>Add New Tax</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <Label htmlFor="tax_name">Tax Name</Label>
            <Input
              id="tax_name"
              value={tax_name}
              onChange={(e) => setTaxName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="tax_rate">Tax Rate (%)</Label>
            <Input
              id="tax_rate"
              type="number"
              value={tax_rate}
              onChange={(e) => setTaxRate(parseFloat(e.target.value))}
              required
            />
          </div>
          <Button type="submit">Add Tax</Button>
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
};

export default TaxForm;
