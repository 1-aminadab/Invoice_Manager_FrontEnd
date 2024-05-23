'use client'
import { useState } from 'react';
import axios from 'axios'; // Import AxiosResponse
import { Card, CardHeader, CardContent, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Slider } from '@/app/components/ui/slider';

// Define item type based on your API response structure
interface ItemType {
    id: number;
    name: string;
    // Add any other properties here based on your item structure
}

interface ListSliderProps {
    endpoint: string;
    title: string;
}

const ListSlider: React.FC<ListSliderProps> = ({ endpoint, title }) => {
    const [items, setItems] = useState<ItemType[]>([]); // Set item type as ItemType[]
    const [refresh, setRefresh] = useState<boolean>(false); // Set refresh type as boolean

  

    const handleDelete = async (id: number) => {
        await axios.delete(`${endpoint}/${id}`);
        setRefresh(!refresh);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <CardTitle>{title}</CardTitle>
                <Button onClick={() => setRefresh(!refresh)}>Refresh</Button>
            </CardHeader>
            <CardContent>
                <Slider className="grid gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between">
                            <span>{item.name}</span>
                            <Button variant="outline" onClick={() => handleDelete(item.id)}>Delete</Button>
                        </div>
                    ))}
                </Slider>
            </CardContent>
        </Card>
    );
};

export default ListSlider;
