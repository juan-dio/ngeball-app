"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login with:", email, password);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background py-8">
      {/* Login Card (Frame 141) */}
      <Card className="w-full max-w-118 rounded-[16px] border-border bg-white gap-0 p-8">
        <CardHeader className="flex flex-col items-center gap-6 p-0 pb-6">
          {/* Reusable Logo */}
          <Logo />

          {/* Welcome back (Frame 146) */}
          <div className="flex flex-col items-center gap-2 text-center">
            <CardTitle className="text-2xl text-text-primary tracking-tight">
              Welcome back
            </CardTitle>
            <CardDescription className="text-body text-text-secondary">
              Don&apos;t have account?{" "}
              <Link href="/register" className="text-secondary hover:underline">
                Sign up
              </Link>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Form Fields (Frame 144) */}
            <div className="flex flex-col gap-3">
              {/* Email (Frame 151) */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="email" className="text-body text-text-primary">
                  Email
                </Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">
                    <Mail className="h-4 w-4" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="eg. youremail@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 pl-10 border-border rounded-[6px] text-body placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                  />
                </div>
              </div>

              {/* Password (Frame 152) */}
              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="password"
                  className="text-body text-text-primary"
                >
                  Password
                </Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-text-secondary">
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 px-10 border-border rounded-[6px] text-body placeholder:text-text-secondary focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary hover:text-text-primary focus:outline-none cursor-pointer"
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="h-10 w-full bg-primary hover:bg-primary/90 text-white rounded-[12px] font-semibold text-sm transition-colors cursor-pointer"
            >
              Login
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-5 p-0 pt-5 pb-8 border-none bg-transparent">
          {/* Divider (Frame 147) */}
          <div className="flex w-full items-center justify-center gap-2">
            <Separator className="flex-1 bg-border" />
            <span className="text-small font-normal text-text-secondary shrink-0">
              Or continue with
            </span>
            <Separator className="flex-1 bg-border" />
          </div>

          {/* Google Sign In Button (Frame 148) */}
          <Button
            variant="outline"
            className="h-14 w-14 p-0 border-border rounded-[6px] bg-white hover:bg-background flex items-center justify-center cursor-pointer"
            onClick={() => console.log("Google Login clicked")}
          >
            {/* Google Icon SVG */}
            <svg
              className="size-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 12-4.53z"
                fill="#EA4335"
              />
            </svg>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
