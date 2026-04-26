import React from 'react';
import Link from 'next/link';
import { Droplet, Github, BookOpen, Shield } from 'lucide-react';

const SiteFooter = () => {
  return (
    <footer className="bg-[#111111] text-neutral-400 py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left: Logo & Text */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 text-white group">
              <div className="bg-[#b91c1c] p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Droplet className="w-6 h-6 fill-current text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">LIFE LINK</span>
            </Link>
            <p className="max-w-xs leading-relaxed">
              Empowering students to save lives through seamless blood donation tracking and community impact.
            </p>
          </div>

          {/* Middle: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg mb-2">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="hover:text-[#b91c1c] transition-colors">Home</Link>
              <Link href="/about" className="hover:text-[#b91c1c] transition-colors">About Us</Link>
              <Link href="/donate" className="hover:text-[#b91c1c] transition-colors font-bold text-white">Donate Now</Link>
            </nav>
          </div>

          {/* Right: Dev Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg mb-2">Developer Resources</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/admin" className="flex items-center gap-2 hover:text-white transition-colors">
                <Shield className="w-4 h-4" />
                Admin Login
              </Link>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub Repository
              </a>
              <Link href="/docs" className="flex items-center gap-2 hover:text-white transition-colors">
                <BookOpen className="w-4 h-4" />
                Documentation
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm tracking-wide">
          <p>© 2026 Life Link Project. Designed for Humanity.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
