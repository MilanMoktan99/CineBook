import React from "react";
import { Film } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black/90 text-gray-300 border-t border-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">

        {/* Logo + Description */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-red-500 font-bold text-2xl">
            <Film />
            CineBook
          </div>
          <p className="text-gray-400 max-w-sm">
            Discover the latest movies, book tickets, and stay updated with CineBook. Your ultimate cinema companion.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold">Navigation</h3>
          <div className="flex flex-col gap-2">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/movies" className="hover:text-white">Movies</Link>
            <Link to="/category" className="hover:text-white">Category</Link>
            <Link to="/genre" className="hover:text-white">Genre</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>

        {/* Policies / Info Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold">Info</h3>
          <div className="flex flex-col gap-2">
            <Link to="/faqs" className="hover:text-white">FAQs</Link>
            <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} CineBook. All rights reserved.
      </div>
    </footer>
  );
}
