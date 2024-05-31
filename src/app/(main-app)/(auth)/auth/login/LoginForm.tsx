"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { hash, compare } from "bcrypt";

type Inputs = {
  email: string;
  password: string;
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (loading) return;
    setLoading(true);

    const singInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (singInData?.error) {
      toast.error("Worng email or password");
      setLoading(false);
      return;
    }

    toast.success("Login success");
    router.push("/");
    console.log(singInData);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-0">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email", {
                required: "Email is requred",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Email is not valid",
                },
              })}
              error={errors.email?.message}
              type="email"
              placeholder="m@example.com"
            />
          </div>
          <div className="grid gap-0">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              {...register("password", {
                required: "Passowrd is requred",
                minLength: {
                  value: 6,
                  message: "Password dosen't match",
                },
              })}
              error={errors.password?.message}
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <Button loading={loading} type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/singup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
