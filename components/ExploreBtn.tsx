'use client';
import React from 'react'
import posthog from 'posthog-js';
import { FaArrowDown } from "react-icons/fa";

const ExploreBtn = () => {
  return (
    <button 
      type="button" 
      id="explore-btn" 
      className="mt-7 mx-auto flex items-center  bg-white/5 border border-white/10 
        backdrop-blur-xl 
        rounded-full 
        px-6 py-3"
      onClick={() => {
        posthog.capture('explore_events_clicked', { target_section: '#events' });
        console.log('Click');
      }}
    >
      <a 
        href="#events" 
        className="flex items-center gap-2 text-white"
      >
        Explore Events
        <FaArrowDown />
      </a>
    </button>
  )
}

export default ExploreBtn;
