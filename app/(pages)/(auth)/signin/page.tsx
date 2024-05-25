"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "@/app/components/ui/label";

interface SigninFormState {
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

export default function SigninForm() {
  const router = useRouter();
  const [formState, setFormState] = useState<SigninFormState>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Preloading can trigger this effect to use router right after loading
    router.prefetch('/home');
  }, [router]);

  const validateInputs = (): boolean => {
    const newErrors: Errors = {};
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/auth/local/signin', formState, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const data = response.data;
        // Store tokens and user data
        localStorage.setItem('tokens', JSON.stringify(data.tokens));
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push('/');
      } else {
        setErrors({ form: response.data.error });
      }
    } catch (error:any) {
      setErrors({ form: error.response.data.error });
      console.log('====================================');
      console.log(error.response);
      console.log('====================================');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:h-[100vh] lg:grid-cols-2 xl:min-h-[800px]">
      {loading && <LoadingSpinner />}
      <div className="flex items-center justify-center py-12 h-[100vh] ">
        <div className="mx-auto grid w-[350px] gap-6 shadow-lg border border-gray-300 p-10 rounded-md">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
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
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
            {errors.form && <span className="text-red-500 text-sm">{errors.form}</span>}
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
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
  );
}
