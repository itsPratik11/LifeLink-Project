"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle2, UserCircle2, MapPin, Phone } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { updateProfile } from "./actions";

export default function ProfilePage() {
    const { data: session, isPending } = useSession();
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        bloodType: "",
        mobileNumber: "",
        alternateMobileNumber: "",
        gender: "",
        address: "",
        state: "",
        district: "",
        city: "",
    });

    useEffect(() => {
        if (session && session.user) {
            setFormData({
                name: session.user.name || "",
                bloodType: (session.user as any).bloodType || "",
                mobileNumber: (session.user as any).mobileNumber || "",
                alternateMobileNumber: (session.user as any).alternateMobileNumber || "",
                gender: (session.user as any).gender || "",
                address: (session.user as any).address || "",
                state: (session.user as any).state || "",
                district: (session.user as any).district || "",
                city: (session.user as any).city || "",
            });
        }
    }, [session]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.id) return;
        
        setErrorMsg("");
        setSuccessMsg("");
        setLoading(true);

        try {
            // Because we're bypassing better-auth client updater in favor of direct DB action,
            // we will run the server action. 
            const res = await updateProfile(session.user.id, formData);
            if (res.success) {
                setSuccessMsg("Profile updated successfully. Changes are now live!");
                // Force a reload so the session state updates seamlessly
                setTimeout(() => window.location.reload(), 1500); 
            } else {
                setErrorMsg(res.error || "An error occurred");
            }
        } catch (err: any) {
            setErrorMsg("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return <div className="p-8 text-gray-500 animate-pulse">Loading profile...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">Your Profile</h1>
                <p className="text-gray-500">Update your personal and contact details to help us coordinate better in times of need.</p>
            </div>

            {successMsg && (
                <Alert className="mb-8 border-green-500 bg-green-50 text-green-800">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{successMsg}</AlertDescription>
                </Alert>
            )}

            {errorMsg && (
                <Alert variant="destructive" className="mb-8">
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMsg}</AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-10">
                
                {/* 1. Basic Identity */}
                <section>
                    <div className="flex items-center gap-2 mb-6 border-b pb-2">
                        <UserCircle2 className="w-5 h-5 text-[#ed1b2e]" />
                        <h2 className="text-xl font-bold text-gray-800">Identity Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-700 font-semibold">Full Name <span className="text-red-500">*</span></Label>
                            <Input 
                                id="name" 
                                required 
                                value={formData.name} 
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 font-semibold">Email Address</Label>
                            <Input 
                                id="email" 
                                disabled 
                                value={session?.user?.email || ""} 
                                className="h-11 bg-gray-50 text-gray-400 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-400">Email cannot be changed.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bloodType" className="text-gray-700 font-semibold">Blood Type <span className="text-red-500">*</span></Label>
                            <Select required value={formData.bloodType} onValueChange={(val) => setFormData({...formData, bloodType: val})}>
                                <SelectTrigger className="h-11">
                                    <SelectValue placeholder="Select Blood Group" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="A+">A+</SelectItem>
                                    <SelectItem value="A-">A-</SelectItem>
                                    <SelectItem value="B+">B+</SelectItem>
                                    <SelectItem value="B-">B-</SelectItem>
                                    <SelectItem value="AB+">AB+</SelectItem>
                                    <SelectItem value="AB-">AB-</SelectItem>
                                    <SelectItem value="O+">O+</SelectItem>
                                    <SelectItem value="O-">O-</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="gender" className="text-gray-700 font-semibold">Gender</Label>
                            <Select value={formData.gender} onValueChange={(val) => setFormData({...formData, gender: val})}>
                                <SelectTrigger className="h-11">
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </section>

                {/* 2. Contact Information */}
                <section>
                    <div className="flex items-center gap-2 mb-6 border-b pb-2">
                        <Phone className="w-5 h-5 text-[#ed1b2e]" />
                        <h2 className="text-xl font-bold text-gray-800">Contact Information</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="mobile" className="text-gray-700 font-semibold">Mobile Number <span className="text-red-500">*</span></Label>
                            <Input 
                                id="mobile" 
                                required
                                placeholder="10-digit number"
                                value={formData.mobileNumber} 
                                onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="altMobile" className="text-gray-700 font-semibold">Alternate Mobile Number</Label>
                            <Input 
                                id="altMobile" 
                                placeholder="Optional"
                                value={formData.alternateMobileNumber} 
                                onChange={(e) => setFormData({...formData, alternateMobileNumber: e.target.value})}
                                className="h-11"
                            />
                        </div>
                    </div>
                </section>

                {/* 3. Location Details */}
                <section>
                    <div className="flex items-center gap-2 mb-6 border-b pb-2">
                        <MapPin className="w-5 h-5 text-[#ed1b2e]" />
                        <h2 className="text-xl font-bold text-gray-800">Location Details</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="space-y-2">
                            <Label htmlFor="state" className="text-gray-700 font-semibold">State <span className="text-red-500">*</span></Label>
                            <Input 
                                id="state" 
                                required
                                placeholder="e.g. Maharashtra"
                                value={formData.state} 
                                onChange={(e) => setFormData({...formData, state: e.target.value})}
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="district" className="text-gray-700 font-semibold">District</Label>
                            <Input 
                                id="district" 
                                value={formData.district} 
                                onChange={(e) => setFormData({...formData, district: e.target.value})}
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city" className="text-gray-700 font-semibold">City <span className="text-red-500">*</span></Label>
                            <Input 
                                id="city" 
                                required
                                value={formData.city} 
                                onChange={(e) => setFormData({...formData, city: e.target.value})}
                                className="h-11"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address" className="text-gray-700 font-semibold">Full Address</Label>
                        <Input 
                            id="address" 
                            placeholder="Street, locality, landmark"
                            value={formData.address} 
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            className="h-11"
                        />
                    </div>
                </section>

                <div className="flex justify-end pt-4 border-t">
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="bg-[#ed1b2e] hover:bg-[#c91426] text-white px-8 h-12 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        {loading ? "Saving..." : "Save Profile"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
