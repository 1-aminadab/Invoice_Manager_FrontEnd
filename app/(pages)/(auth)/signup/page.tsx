'use client'
import Link from "next/link"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'


import { Button } from "../../../components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import Image from "next/image"
import { useState } from "react"

export default function LoginForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    const validateInputs = () => {
        // Add your validation logic here
        // Return true if all inputs are valid, false otherwise
    };

    const handleInputChange = (e:any, setter:any) => {
        const value = e.target.value;
        setter(value);
        // Validate the input after every change
        
    };
    return (
        <div className="w-full lg:grid lg:h-[100vh] lg:grid-cols-2 xl:min-h-[800px] bg-[#111111] p-10">
            <div className="flex items-center justify-center mx-10  h-[100vh] ">

                <Card className="mx-auto max-w-sm bg-[#101010] shadow-md">
                    <CardHeader>
                        <CardTitle className="text-xl">Sign Up</CardTitle>
                        <CardDescription>
                            Enter your information to create an account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="first-name">First name</Label>
                                    <Input id="first-name" placeholder="Amanuel" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="last-name">Last name</Label>
                                    <Input id="last-name" placeholder="Tadesse" required />
                                </div>
                            </div>
                            <div  className="grid grid-cols-2 gap-4">
<div className="grid gap-2">
                                <Label htmlFor="email">Phone Number</Label>
                                <PhoneInput
                                    country={'et'}
                                    value={phoneNumber}
                                    inputStyle={{color:"black", width:"100%", height:"100%"}}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div> 
                            <div className="grid gap-2">
                                    <Label htmlFor="first-name">Country</Label>
                                    <Input id="first-name" placeholder="Ethipia" required />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                               
                                <div className="grid gap-2">
                                    <Label htmlFor="last-name">City</Label>
                                    <Input id="last-name" placeholder="Addis Abab" required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="last-name">Address</Label>
                                    <Input id="last-name" placeholder="Wesen Michael" required />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" />
                            </div>
                            <div className="mt-4 text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/signin" className="underline">
                                    Sign in
                                </Link>
                            </div>
                            <Button type="submit" className="w-full" variant={'outline'}>
                                Create an account
                            </Button>
                            {/* <Button variant="outline" className="w-full">
                                Sign up with GitHub
                            </Button> */}
                        </div>

                    </CardContent>
                </Card>
            </div>
            <div className="hidden bg-muted lg:block ">
                <Image
                    src="/placeholder.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
