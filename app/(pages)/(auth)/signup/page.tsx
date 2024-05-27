"use client";
import Link from "next/link";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import Image from "next/image";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { setLogin } from "@/app/lib/features/userSlice";
import { useDispatch } from "react-redux";
import { User } from "@/app/types/type";
import { setCookie } from "cookies-next";

interface SignupFormState {
  first_name: string;
  last_name: string;
  phoneNumber: string;
  country: string;
  city: string;
  address: string;
  email: string;
  password: string;
}

interface Errors {
  [key: string]: string;
}

const LoadingSpinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

export default function SignupForm() {
  const router = useRouter();
  const dispatch = useDispatch()
  const [formState, setFormState] = useState<SignupFormState>({
    first_name: '',
    last_name: '',
    phoneNumber: '',
    country: '',
    city: '',
    address: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  const validateInputs = (): boolean => {
    const newErrors: Errors = {};
    if (!formState.first_name) newErrors.first_name = "First name is required";
    if (!formState.last_name) newErrors.last_name = "Last name is required";
    if (!formState.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formState.country) newErrors.country = "Country is required";
    if (!formState.city) newErrors.city = "City is required";
    if (!formState.address) newErrors.address = "Address is required";
    if (!formState.email) newErrors.email = "Email is required";
    if (!formState.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState(prevState => ({ ...prevState, [id]: value }));
    setErrors(prev => ({ ...prev, [id]: "" }));
  };

  const handlePhoneChange = (value: string) => {
    setFormState(prevState => ({ ...prevState, phoneNumber: value }));
    setErrors(prev => ({ ...prev, phoneNumber: "" }));
  };

 
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setLoading(true);
    try {
      console.log('====================================');
      console.log("we are starting");
      console.log('====================================');
      await axios.post('http://localhost:5000/auth/local/signup', formState)
      .then((response) => {
          const data = response.data;
      if (response.status === 200 || response.status === 201) {
        // Store tokens and user data
        const data: { access_token: string; refresh_token: string; user: User } = response.data.data;
        setCookie('access_token',data.access_token)
        setCookie('refresh_token',data.refresh_token)
        dispatch(setLogin({access_token:data.access_token, refresh_token:data.refresh_token,  user: data.user }));
        router.push('/');
      } else {
        setErrors({ form: data.message });
      }
      })
      .catch((error) => {console.log('====================================');
      console.log(error);
      console.log('====================================');});
    
    } catch (error: any) {
      setErrors({ form: 'Signup failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  const urltoFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
    if (url.startsWith("data:")) {
      const arr = url.split(",");
      const mimeMatch = arr[0]?.match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : null;
      const bstr = atob(arr[arr.length - 1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime || mimeType });
    }
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return new File([buffer], filename, { type: mimeType });
  };

  useEffect(() => {
    const dataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=";
    urltoFile(dataUrl, "hello.txt", "text/plain").then(file => setImage(file));
  }, []);

  return (
    <div className="w-full lg:grid lg:h-[100vh] lg:grid-cols-2 xl:min-h-[800px]">
      {loading && <LoadingSpinner />}
      <div className="flex items-center justify-center mx-10 h-[100vh]">
        <Card className="mx-auto max-w-s] shadow-lg border border-gray-300">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first_name">First name</Label>
                    <Input
                      id="first_name"
                      placeholder="Amanuel"
                      value={formState.first_name}
                      onChange={handleInputChange}
                      className={errors.first_name ? 'border-red-500' : ''}
                      required
                    />
                    {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name}</span>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last_name">Last name</Label>
                    <Input
                      id="last_name"
                      placeholder="Tadesse"
                      value={formState.last_name}
                      onChange={handleInputChange}
                      className={errors.last_name ? 'border-red-500' : ''}
                      required
                    />
                    {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name}</span>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <PhoneInput
                      country={"et"}
                      value={formState.phoneNumber}
                      inputStyle={{ color: "black", width: "100%", height: "100%" }}
                      onChange={handlePhoneChange}
                      inputProps={{ className: errors.phoneNumber ? 'border-red-500' : '' }}
                    />
                    {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber}</span>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      placeholder="Ethiopia"
                      value={formState.country}
                      onChange={handleInputChange}
                      className={errors.country ? 'border-red-500' : ''}
                      required
                    />
                    {errors.country && <span className="text-red-500 text-sm">{errors.country}</span>}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Addis Ababa"
                      value={formState.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'border-red-500' : ''}
                      required
                    />
                    {errors.city && <span className="text-red-500 text-sm">{errors.city}</span>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Wesen Michael"
                      value={formState.address}
                      onChange={handleInputChange}
                      className={errors.address ? 'border-red-500' : ''}
                      required
                    />
                    {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formState.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'border-red-500' : ''}
                    required
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formState.password}
                    onChange={handleInputChange}
                    className={errors.password ? 'border-red-500' : ''}
                    required
                  />
                  {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/signin" className="underline">
                    Sign in
                  </Link>
                </div>
                {errors.form && <span className="text-red-500 text-sm">{errors.form}</span>}
                <Button type="submit" className="w-full" variant={"outline"}>
                  Create an account
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="hidden bg-muted lg:block">
        {image && (
          <Image
            src={URL.createObjectURL(image)}
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        )}
      </div>
    </div>
  );
}
