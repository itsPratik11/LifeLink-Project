"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Droplet,
    Building2,
    Globe,
    ShieldCheck,
    Upload,
    User,
    Mail,
    Phone,
    MapPin,
    Lock,
    Check,
    ArrowRight,
    ArrowLeft,
    Loader2
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { authClient } from '@/lib/auth-client';

export default function OrganizerRegisterPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        orgName: '',
        orgCategory: '',
        website: '',
        licenseId: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
    });

    const totalSteps = 4;
    const progress = (currentStep / totalSteps) * 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, orgCategory: value }));
    };

    const validateStep = (step: number) => {
        switch (step) {
            case 1:
                if (!formData.orgName || !formData.orgCategory) {
                    toast.error("Please fill in Organization Name and Category.");
                    return false;
                }
                return true;
            case 2:
                if (!formData.licenseId) {
                    toast.error("License / Registration Number is required.");
                    return false;
                }
                return true;
            case 3:
                if (!formData.contactPerson || !formData.email || !formData.phone || !formData.address || !formData.zipCode) {
                    toast.error("Please fill in all contact details.");
                    return false;
                }
                if (!formData.email.includes('@')) {
                    toast.error("Please enter a valid email address.");
                    return false;
                }
                return true;
            case 4:
                if (!formData.password || !formData.confirmPassword) {
                    toast.error("Password is required.");
                    return false;
                }
                if (formData.password !== formData.confirmPassword) {
                    toast.error("Passwords do not match.");
                    return false;
                }
                if (!formData.agreeTerms) {
                    toast.error("You must agree to the Terms & Conditions.");
                    return false;
                }
                return true;
            default:
                return true;
        }
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, totalSteps));
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        if (!validateStep(4)) return;

        setIsLoading(true);

        await authClient.signUp.email({
            email: formData.email,
            password: formData.password,
            name: formData.orgName,
            role: "organization",
            organizationType: formData.orgCategory,
            licenseId: formData.licenseId,
            zipCode: formData.zipCode,
            image: undefined, // Optional
        }, {
            onRequest: () => {
                toast.loading("Creating organization account...");
            },
            onSuccess: () => {
                setIsLoading(false);
                toast.dismiss();
                toast.success("Organization Registered Successfully!");
                router.push('/dashboard');
            },
            onError: (ctx) => {
                setIsLoading(false);
                toast.dismiss();
                toast.error(ctx.error.message || "Registration failed. Please try again.");
            }
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* LEFT SIDE: TRUST PANEL */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black">
                {/* Background Image Placeholder */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop")' }}
                ></div>

                {/* Overlay Content */}
                <div className="relative z-10 flex flex-col justify-between p-12 h-full text-white">
                    <div>
                        <div className="flex items-center gap-2 mb-8">
                            <div className="bg-[#ed1b2e] p-2 rounded-md">
                                <Droplet className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">LIFE LINK PARTNERS</span>
                        </div>
                        <h1 className="text-5xl font-extrabold leading-tight mb-6">
                            Join 500+ Hospitals and NGOs saving lives.
                        </h1>
                        <p className="text-lg text-gray-200 max-w-md">
                            Streamline your blood drives, manage donor records, and make a bigger impact with our unified platform.
                        </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
                        <p className="text-xl italic font-serif mb-4">"Managing drives has never been easier. Life Link transformed how we connect with donors."</p>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">DR</div>
                            <div>
                                <p className="font-bold text-sm">Dr. Sarah Jenkins</p>
                                <p className="text-xs text-gray-300">Director, City General Hospital</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: WIZARD FORM */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-24 bg-white relative">

                {/* Mobile Header (Only visible on small screens) */}
                <div className="lg:hidden mb-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="bg-[#ed1b2e] p-2 rounded-md">
                            <Droplet className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold">Partner Registration</h2>
                </div>

                <div className="max-w-md mx-auto w-full space-y-8">

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium text-gray-500">
                            <span>Step {currentStep} of {totalSteps}</span>
                            <span>{Math.round(progress)}% Completed</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    {/* STEPS CONTENT */}
                    <div className="min-h-[400px]">

                        {/* STEP 1: IDENTITY */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Organization Identity</h3>
                                    <p className="text-gray-500 text-sm">Tell us about your organization.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="orgName">Organization Name</Label>
                                        <div className="relative">
                                            <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                            <Input
                                                id="orgName"
                                                name="orgName"
                                                placeholder="e.g. City General Hospital"
                                                className="pl-10"
                                                value={formData.orgName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="orgCategory">Category</Label>
                                        <Select onValueChange={handleSelectChange} value={formData.orgCategory}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Hospital">Hospital / Medical Center</SelectItem>
                                                <SelectItem value="NGO">NGO / Non-Profit</SelectItem>
                                                <SelectItem value="College">Educational Institute</SelectItem>
                                                <SelectItem value="Corporate">Corporate / Business</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="website">Official Website <span className="text-gray-400 font-normal">(Optional)</span></Label>
                                        <div className="relative">
                                            <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                            <Input
                                                id="website"
                                                name="website"
                                                placeholder="www.example.org"
                                                className="pl-10"
                                                value={formData.website}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: VERIFICATION */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Verification & Authority</h3>
                                    <p className="text-gray-500 text-sm">We verify every partner to ensure detailed safety.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="licenseId">License / Registration Number</Label>
                                        <div className="relative">
                                            <ShieldCheck className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                            <Input
                                                id="licenseId"
                                                name="licenseId"
                                                placeholder="Medical License or NGO Darpan ID"
                                                className="pl-10"
                                                value={formData.licenseId}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Upload Certificate of Registration</Label>
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                            <div className="mx-auto h-12 w-12 text-gray-400 mb-3">
                                                <Upload className="h-full w-full" />
                                            </div>
                                            <p className="text-sm text-gray-600 font-medium">Click to browse or drag file here</p>
                                            <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 5MB</p>
                                            <Button variant="outline" size="sm" className="mt-4" type="button">Browse Files</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: ADMIN & LOCATION */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Admin & Location</h3>
                                    <p className="text-gray-500 text-sm">Who will manage this account?</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="contactPerson">Primary Contact Person</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                            <Input
                                                id="contactPerson"
                                                name="contactPerson"
                                                placeholder="Full Name"
                                                className="pl-10"
                                                value={formData.contactPerson}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Official Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="admin@hospital.org"
                                                className="pl-10"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <p className="text-xs text-yellow-600 flex items-center gap-1 mt-1">
                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                                            Please use an official organization email if possible.
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                            <Input
                                                id="phone"
                                                name="phone"
                                                placeholder="+1 (555) 000-0000"
                                                className="pl-10"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2 space-y-2">
                                            <Label htmlFor="address">Headquarters Address</Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                                <Input
                                                    id="address"
                                                    name="address"
                                                    placeholder="Street Address"
                                                    className="pl-10"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Input
                                                name="city"
                                                placeholder="City"
                                                value={formData.city}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Input
                                                name="zipCode"
                                                placeholder="Zip Code"
                                                value={formData.zipCode}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: ACCOUNT CREATION */}
                        {currentStep === 4 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Secure Your Account</h3>
                                    <p className="text-gray-500 text-sm">Create a password to access your dashboard.</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Create Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                            <Input
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="••••••••"
                                                className="pl-10"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                            <Input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                placeholder="••••••••"
                                                className="pl-10"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100 mt-6">
                                        <Checkbox
                                            id="agreeTerms"
                                            checked={formData.agreeTerms}
                                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))}
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <Label
                                                htmlFor="agreeTerms"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                I agree to the Life Link Partner Terms & Conditions
                                            </Label>
                                            <p className="text-xs text-muted-foreground">
                                                By clicking register, you agree to our verification process and data handling policies.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* NAVIGATION ACTIONS */}
                    <div className="flex justify-between pt-6 border-t border-gray-100">
                        {currentStep > 1 ? (
                            <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back
                            </Button>
                        ) : (
                            <div></div> // Spacer
                        )}

                        {currentStep < 4 ? (
                            <Button onClick={handleNext} className="bg-[#ed1b2e] hover:bg-[#d9192a]">
                                Next Step <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="bg-[#ed1b2e] hover:bg-[#d9192a] min-w-[140px]"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                                    </>
                                ) : (
                                    <>
                                        Complete Registration <Check className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        )}
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-500">
                            Already a partner? <Link href="/login" className="text-[#ed1b2e] font-bold hover:underline">Log in here</Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
