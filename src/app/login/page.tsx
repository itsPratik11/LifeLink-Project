"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Droplet, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        await authClient.signIn.email({
            email,
            password,
        }, {
            onRequest: () => {
                toast.loading("Signing in...");
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Welcome back!");
                router.push('/dashboard');
            },
            onError: (ctx) => {
                toast.dismiss();
                toast.error(ctx.error.message);
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md border border-gray-100">

                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <Droplet className="h-8 w-8 text-[#ed1b2e] fill-[#ed1b2e]" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Welcome Back Donor
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to manage your appointments and track your impact.
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="name@example.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm pr-10"
                                placeholder="Password"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-gray-600 z-20"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link href="/forgot-password" className="font-medium text-red-600 hover:text-red-500 hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-[#ed1b2e] hover:bg-[#d9192a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors uppercase tracking-wide shadow-sm"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        New to Life Link?{' '}
                        <Link href="/register" className="font-medium text-[#ed1b2e] hover:text-[#d9192a] hover:underline">
                            Create an Account
                        </Link>
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                        Hospital or NGO?{' '}
                        <Link href="/organizers/register" className="font-medium text-[#ed1b2e] hover:text-[#d9192a] hover:underline">
                            Partner with us
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}
