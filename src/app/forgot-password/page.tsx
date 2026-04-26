"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Droplet, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;

        await authClient.forgetPassword({
            email,
            redirectTo: '/reset-password',
        }, {
            onRequest: () => {
                toast.loading("Sending reset link...");
            },
            onSuccess: () => {
                toast.dismiss();
                toast.success("Reset link sent successfully!");
                setIsSubmitted(true);
            },
            onError: (ctx) => {
                toast.dismiss();
                toast.error(ctx.error.message || "Something went wrong.");
                setIsLoading(false);
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
                        Forgot Password
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your email address to receive a password reset link.
                    </p>
                </div>

                {isSubmitted ? (
                    <div className="text-center mt-8 space-y-6">
                        <div className="bg-green-50 text-green-800 border border-green-200 p-4 rounded-md">
                            We've simulated sending a password reset link. Check your terminal output!
                        </div>
                        <Link 
                            href="/login"
                            className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-500 hover:underline"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Sign In
                        </Link>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-[#ed1b2e] hover:bg-[#d9192a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors uppercase tracking-wide shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Sending..." : "Send Reset Link"}
                            </button>
                        </div>
                        
                        <div className="text-center mt-4">
                            <Link 
                                href="/login"
                                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:underline"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Back to Sign In
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
