'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardContent, CardTitle} from '@/app/components/ui/card';
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
interface TaxFormProps {
    refresh: () => void;
}

const TaxForm: React.FC<TaxFormProps> = ({ refresh }) => {
    const [tax_name, setTaxName] = useState<string>('');
    const [tax_rate, setTaxRate] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newTax = { tax_name, tax_rate };
        await axios.post('/api/taxes', newTax);
        refresh(); // Refresh the list of taxes
        // Optionally reset form fields
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
                        <Input id="tax_name" value={tax_name} onChange={(e) => setTaxName(e.target.value)} required />
                    </div>
                    <div>
                        <Label htmlFor="tax_rate">Tax Rate (%)</Label>
                        <Input id="tax_rate" type="number" value={tax_rate} onChange={(e) => setTaxRate(parseFloat(e.target.value))} required />
                    </div>
                    <Button type="submit">Add Tax</Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default TaxForm;
