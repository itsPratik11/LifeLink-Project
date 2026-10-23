"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Calendar, Search, Clock, Users, Droplet, ArrowLeft, Heart, LayoutDashboard, AlertCircle, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import BookAppointmentModal from '@/components/ui/book-appointment-modal';

export type CampDataType = {
    id: string | number;
    name: string;
    organizer: string;
    location: string;
    date: string;
    time: string;
    distance: string;
    slotsTotal: number;
    slotsBooked: number;
};

export default function SchedulePage() {
    const searchParams = useSearchParams();
    const emergencyBloodGroup = searchParams.get('bloodGroup');
    const emergencyHospital = searchParams.get('hospital');

    const [searchTerm, setSearchTerm] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [allCamps, setAllCamps] = useState<CampDataType[]>([]);
    const [camps, setCamps] = useState<CampDataType[]>([]);
    const [loading, setLoading] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const [selectedCampForBooking, setSelectedCampForBooking] = useState<CampDataType | null>(null);

    // Auto-populate and trigger search if emergency params are passed
    useEffect(() => {
        if (emergencyHospital || emergencyBloodGroup) {
            setSearchTerm("Delhi");
            setIsSearched(true);
        }
    }, [emergencyHospital, emergencyBloodGroup]);

    const fetchCamps = async (activateSearch = false) => {
        if (activateSearch) {
            setLoading(true);
            setIsSearched(true);
        }
        try {
            const res = await fetch('/api/camps?stateCode=-1&districtCode=-1');
            const data = await res.json();
            if (Array.isArray(data)) {
                setAllCamps(data);
            }
        } catch (err) {
            console.error("Failed to fetch live eRaktKosh data.", err);
        } finally {
            if (activateSearch) {
                setLoading(false);
            }
        }
    };

    // Fetch dataset silently in background when page mounts without displaying all camps initially
    useEffect(() => {
        fetchCamps(false);
    }, []);

    // Filter camps automatically whenever allCamps, searchTerm, searchDate, or isSearched changes
    useEffect(() => {
        if (!isSearched) {
            setCamps([]);
            return;
        }

        const filtered = allCamps.filter((camp: CampDataType) => {
            if (!camp) return false;
            
            let matchesTerm = true;
            if (searchTerm.trim()) {
                const term = searchTerm.trim().toLowerCase();
                matchesTerm =
                    (camp.name || "").toLowerCase().includes(term) ||
                    (camp.location || "").toLowerCase().includes(term) ||
                    (camp.organizer || "").toLowerCase().includes(term);
            }

            let matchesDate = true;
            if (searchDate) {
                const searchTime = new Date(searchDate).getTime();
                const campTime = new Date(camp.date).getTime();
                if (!isNaN(searchTime) && !isNaN(campTime)) {
                     matchesDate = campTime >= searchTime;
                }
            }

            return matchesTerm && matchesDate;
        });
        
        setCamps(filtered);
    }, [allCamps, searchTerm, searchDate, isSearched]);

    // Re-fetch live data and activate display when the user clicks Search
    const handleSearch = () => {
        if (!searchTerm.trim() && !searchDate) {
            alert("Please enter a location or select a date to view camps.");
            return;
        }
        setIsSearched(true);
        fetchCamps(true);
    };

    const handleBookingSuccess = (campId: string | number) => {
        setAllCamps((prev) =>
            prev.map((c) => (c.id === campId ? { ...c, slotsBooked: c.slotsBooked + 1 } : c))
        );
        setCamps((prev) =>
            prev.map((c) => (c.id === campId ? { ...c, slotsBooked: c.slotsBooked + 1 } : c))
        );
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">

            {/* TOP NAVIGATION HEADER */}
            <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 md:px-8 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all border border-gray-200 hover:border-red-200"
                    >
                        <ArrowLeft className="w-4 h-4 text-red-600" />
                        Back to Home
                    </Link>

                    <Link href="/" className="flex items-center gap-2 text-xl font-black text-gray-900">
                        <div className="p-1.5 rounded-lg bg-red-600 text-white">
                            <Heart className="w-5 h-5 fill-current" />
                        </div>
                        Life<span className="text-red-600">Link</span>
                    </Link>

                    <Link 
                        href="/dashboard" 
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all border border-gray-200 hover:border-red-200"
                    >
                        <LayoutDashboard className="w-4 h-4 text-red-600" />
                        Dashboard
                    </Link>
                </div>
            </header>

            {/* EMERGENCY SOS INCOMING BANNER IF COMING FROM SHORTAGE TICKER */}
            {emergencyBloodGroup && (
                <div className="bg-red-950 text-white border-b border-red-800 px-4 py-3">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                            <ShieldAlert className="w-5 h-5 text-red-400 animate-pulse flex-shrink-0" />
                            <span className="text-xs sm:text-sm font-semibold">
                                <span className="bg-red-600 px-2 py-0.5 rounded text-xs font-black uppercase tracking-wider mr-2">
                                    CRITICAL SOS
                                </span>
                                Responding to shortage for <strong className="text-red-300 font-black">{emergencyBloodGroup}</strong> {emergencyHospital ? `at ${emergencyHospital}` : ""}. Select an available slot below to confirm priority fast-track dispatch.
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* 1. HERO SEARCH SECTION */}
            <section className="bg-[#b91c1c] py-12 px-4 shadow-md">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                        Find a Blood Drive Near You
                    </h1>
                    <p className="text-red-100 text-lg">
                        Your donation can save up to 3 lives. Find a location and book today.
                    </p>

                    <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row gap-4 items-center max-w-3xl mx-auto translate-y-4 md:translate-y-8">

                        {/* Location Input */}
                        <div className="relative flex-1 w-full">
                            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="City, Zip, or Location"
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium text-gray-700"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Date Input */}
                        <div className="relative w-full md:w-auto">
                            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="date"
                                className="w-full md:w-48 pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all font-medium text-gray-700 cursor-pointer"
                                value={searchDate}
                                onChange={(e) => setSearchDate(e.target.value)}
                            />
                        </div>

                        {/* Search Button */}
                        <Button 
                            onClick={handleSearch}
                            className="w-full md:w-auto h-12 px-8 bg-black text-white hover:bg-gray-800 font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            Search
                        </Button>
                    </div>
                </div>
            </section>

            {/* 2. RESULTS GRID */}
            <section className="flex-1 max-w-7xl mx-auto w-full px-4 pt-16 pb-12">

                {/* Results Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isSearched ? `Available Drives` : `Search For Drives`} {isSearched && searchDate && <span className="text-gray-500 font-medium text-lg ml-2">(from {searchDate})</span>}
                    </h2>
                    {isSearched && !loading && (
                        <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {camps.length} Results Found
                        </span>
                    )}
                </div>

                {loading ? (
                    /* LOADING SKELETONS */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((skel) => (
                            <div key={skel} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col p-5">
                                <div className="flex gap-4">
                                    <Skeleton className="w-14 h-14 rounded-lg bg-gray-100 shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-5 w-3/4 bg-gray-100" />
                                        <Skeleton className="h-4 w-1/2 bg-gray-100" />
                                    </div>
                                </div>
                                <div className="mt-5 space-y-3">
                                    <Skeleton className="h-4 w-full bg-gray-100" />
                                    <Skeleton className="h-4 w-2/3 bg-gray-100" />
                                </div>
                                <div className="mt-auto pt-6">
                                    <Skeleton className="h-2 w-full bg-gray-100 mb-4" />
                                    <Skeleton className="h-11 w-full rounded-md bg-gray-100" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : !isSearched ? (
                    /* INITIAL STATE BEFORE SEARCH */
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-gray-100 p-6 rounded-full mb-4">
                            <Search className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Search to find nearby camps</h3>
                        <p className="text-gray-500 max-w-md">
                            Enter your city, location, or select a date above and hit Search to view live camp data from the National Portal.
                        </p>
                    </div>
                ) : camps.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {camps.map((camp) => {
                            const bookedPercent = Math.min(100, Math.round((Math.max(0, camp.slotsBooked) / Math.max(1, camp.slotsTotal)) * 100));
                            const isFillingFast = bookedPercent >= 90;
                            const dateObj = new Date(camp.date);
                            const isValidDate = !isNaN(dateObj.getTime());
                            const month = isValidDate ? dateObj.toLocaleString('default', { month: 'short' }).toUpperCase() : 'TBD';
                            const day = isValidDate ? dateObj.getDate() : '--';

                            return (
                                <div
                                    key={camp.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                                >
                                    {/* Card Header & Date */}
                                    <div className="p-5 flex items-start gap-4">
                                        <div className="flex flex-col items-center justify-center bg-red-50 text-red-700 rounded-lg w-14 h-14 shrink-0 border border-red-100">
                                            <span className="text-[10px] font-bold tracking-wider">{month}</span>
                                            <span className="text-xl font-black leading-none">{day}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-gray-900 text-lg truncate group-hover:text-[#ed1b2e] transition-colors">{camp.name}</h3>
                                            <p className="text-sm text-gray-500 truncate">{camp.organizer}</p>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="px-5 space-y-3 mb-4">
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                                            <span className="truncate">{camp.location} {camp.distance && <span className="text-gray-400 ml-1">({camp.distance})</span>}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                                            <span>{camp.time}</span>
                                        </div>
                                    </div>

                                    {/* Urgency Section (Footer Push) */}
                                    <div className="mt-auto p-5 pt-0">
                                        <div className="mb-4">
                                            <div className="flex justify-between items-end mb-1.5">
                                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                                                    <Users className="w-3 h-3" /> Slots Booked
                                                </span>
                                                {isFillingFast && (
                                                    <span className="text-[10px] font-bold text-white bg-red-600 px-2 py-0.5 rounded-full animate-pulse">
                                                        FILLING FAST
                                                    </span>
                                                )}
                                            </div>
                                            <Progress value={bookedPercent} className="h-2 bg-gray-100" />
                                            <div className="flex justify-end mt-1">
                                                <span className="text-xs text-gray-400 font-medium">{camp.slotsBooked}/{camp.slotsTotal} filled</span>
                                            </div>
                                        </div>

                                        <Button
                                            onClick={() => setSelectedCampForBooking(camp)}
                                            className="w-full bg-[#ed1b2e] hover:bg-[#d9192a] text-white font-bold h-11 shadow-sm group-hover:shadow-md transition-all active:scale-[0.98]"
                                        >
                                            Book Appointment
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* 3. EMPTY STATE */
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-gray-100 p-6 rounded-full mb-4">
                            <Droplet className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No camps found</h3>
                        <p className="text-gray-500 max-w-md">
                            We couldn't find any blood drives matching "{searchTerm}" {searchDate && `on/after ${searchDate}`}.
                            Try adjusting your filters or search for a wider area.
                        </p>
                        <Button
                            variant="outline"
                            className="mt-6 font-semibold"
                            onClick={() => { 
                                setSearchTerm(""); 
                                setSearchDate(""); 
                                setIsSearched(false);
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </section>

            {/* Book Appointment Modal */}
            <BookAppointmentModal
                isOpen={!!selectedCampForBooking}
                onClose={() => setSelectedCampForBooking(null)}
                camp={selectedCampForBooking}
                onBookingSuccess={handleBookingSuccess}
            />
        </div>
    );
}
