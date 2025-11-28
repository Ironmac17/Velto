import React from "react";
import { Twitter, Linkedin, Github, Wallet2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#2b1e5f] via-[#3c258a] to-[#895bfc] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
              <Wallet2 className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-semibold">Velto</span>
          </div>
          <p className="text-white/80 text-sm max-w-xs">
            Simplify your financial life. Track every expense and reach your goals faster with Velto.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://twitter.com"
              className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="font-semibold text-white mb-3">Explore</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>
              <a href="#features" className="hover:text-white transition">
                Features
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-white transition">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-white transition">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-white/80 text-sm">
            <li>Email: igupta2_be23@thapar.edu</li>
            <li>Phone: +91 9382983292</li>
            <li>Location: Patiala, IN</li>
          </ul>
        </div>
      </div>

      {/* Divider & Signature */}
      <div className="border-t border-white/10 py-3 text-center">
        <p className="text-white/80 text-sm">
          Built and designed by <span className="font-medium text-white">Ishika Gupta</span>
        </p>
        <p className="text-white/70 text-xs mt-2">
          © {new Date().getFullYear()} Velto. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
