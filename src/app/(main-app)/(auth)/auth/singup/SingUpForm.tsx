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
import { singUpWithCredential } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
  fullName: string;
};

export function SingUpForm() {
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

    const singUpData = await singUpWithCredential({
      email: data.email,
      fullName: data.fullName,
      password: data.password,
    });

    if (singUpData.error) {
      toast.error(singUpData.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.success("User singup success");
    router.push("/auth/login");

    console.log(singUpData);
  };

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-0">
            <Label htmlFor="first-name">Name</Label>
            <Input
              error={errors.fullName?.message}
              id="first-name"
              placeholder="Robin"
              {...register("fullName", { required: "Name is required" })}
            />
          </div>
          <div className="grid gap-0">
            <Label htmlFor="email">Email</Label>
            <Input
              error={errors.email?.message}
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email", {
                required: "Email is requred",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "Email is not valid",
                },
              })}
            />
          </div>
          <div className="grid gap-0">
            <Label htmlFor="password">Password</Label>
            <Input
              error={errors.password?.message}
              id="password"
              type="password"
              {...register("password", {
                required: "Password is requred",
                minLength: {
                  value: 6,
                  message: "Minmum 6 cheracter",
                },
              })}
            />
          </div>
          <Button loading={loading} type="submit" className="w-full">
            Create an account
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
