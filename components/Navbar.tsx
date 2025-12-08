'use client';
import React from "react";
import { FaConnectdevelop } from "react-icons/fa";
import posthog from 'posthog-js';

const Navbar = () => {
  return (
    <header className="w-full flex justify-center mt-12 px-4">
      <nav className="
        flex items-center justify-between 
        w-full max-w-5xl 
        bg-white/5 border border-white/10 
        backdrop-blur-xl 
        rounded-full 
        px-6 py-3
      ">
        
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3">
          <FaConnectdevelop className="text-white text-2xl" />
          <span className="text-white text-lg font-medium">DevEvents</span>
        </div>

        {/* Right: Nav Items */}
        <div className="flex items-center gap-8">
          <a href="#" className="text-white/80 hover:text-white font-semibold transition" onClick={() => posthog.capture('navbar_link_clicked', { link_text: 'Home', link_href: '#' })}>
            Home
          </a>
          <a href="#" className="text-white/80 hover:text-white font-semibold transition" onClick={() => posthog.capture('navbar_link_clicked', { link_text: 'Events', link_href: '#' })}>
            Events
          </a>
          <a href="#" className="text-white/80 hover:text-white font-semibold transition" onClick={() => posthog.capture('navbar_link_clicked', { link_text: 'Create Event', link_href: '#' })}>
            Create Event
          </a>
        </div>

      </nav>
    </header>
  );
};

export default Navbar;
