"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Droplet, Eye, EyeOff, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const bloodType = formData.get('blood-type') as string;
        const zipCode = formData.get('zip-code') as string;
        const role = "donor";

        console.log("Registration Payload (Donor):", { name, email, role, bloodType, zipCode });

        await authClient.signUp.email({
            email,
            password,
            name,
            image: undefined,
            bloodType,
            zipCode,
            role,
        }, {
            onRequest: () => {
                toast.loading("Creating donor account...");
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Account successfully created!");
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
                        Become a Life Saver
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join the community and track your lifesaving impact.
                    </p>
                </div>

                {/* Role Toggle */}
                <div className="flex justify-center mt-6">
                    <div className="bg-gray-100 p-1 rounded-lg flex">
                        <button
                            type="button"
                            className="px-6 py-2 rounded-md text-sm font-bold transition-all bg-white text-[#ed1b2e] shadow-sm"
                        >
                            Donor
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push('/organizers/register')}
                            className="px-6 py-2 rounded-md text-sm font-bold transition-all text-gray-500 hover:text-gray-700"
                        >
                            Organization
                        </button>
                    </div>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">

                        {/* Name Field */}
                        <div>
                            <label htmlFor="full-name" className="sr-only">
                                Full Name
                            </label>
                            <input
                                id="full-name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="Full Name"
                            />
                        </div>

                        {/* Email Address */}
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
                                placeholder="Email Address"
                            />
                        </div>

                        {/* Row: Blood Type & Zip Code */}
                        <div className="flex gap-4">
                            {/* Blood Type */}
                            <div className="relative w-1/2">
                                <label htmlFor="blood-type" className="sr-only">Blood Type</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Droplet className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <select
                                        id="blood-type"
                                        name="blood-type"
                                        className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                        defaultValue=""
                                        required
                                    >
                                        <option value="" disabled>Blood Type</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="Unknown">Unknown/Not Sure</option>
                                    </select>
                                </div>
                            </div>

                            {/* Zip Code */}
                            <div className="relative w-1/2">
                                <label htmlFor="zip-code" className="sr-only">Zip Code</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        id="zip-code"
                                        name="zip-code"
                                        type="text"
                                        maxLength={6}
                                        required
                                        className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                        placeholder="Zip Code"
                                    />
                                </div>
                            </div>
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
                                autoComplete="new-password"
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

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-[#ed1b2e] hover:bg-[#d9192a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors uppercase tracking-wide shadow-sm"
                        >
                            Create Account
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already a donor?{' '}
                        <Link href="/login" className="font-medium text-[#ed1b2e] hover:text-[#d9192a] hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}
