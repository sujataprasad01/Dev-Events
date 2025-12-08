'use client';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CiCalendarDate, CiTimer, CiLocationOn } from 'react-icons/ci'
import posthog from 'posthog-js'

interface Props {
  title: string
  image: string
  slug: string
  location: string
  date: string
  time: string
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => {
  return (
    <Link
      href={`/events/${slug}`}
      onClick={() => {
        posthog.capture('event-card-clicked', {
          event_title: title,
          event_slug: slug,
          event_location: location,
          event_date: date,
          event_time: time,
        })
      }}
      className="relative block h-full rounded-lg overflow-hidden shadow hover:shadow-lg transition flex justify-center items-center p-4 bg-white/5 border border-white/10 
        backdrop-blur-xl "
    >
      {/* Event Image */}
      <Image
        src={image}
        alt={title}
        width={360}
        height={380}
        className=" h-full object-cover"
      />

      {/* Glass overlay for text */}
      <div className="absolute bottom-0 left-0 bg-black/50 backdrop-blur-sm text-white p-3 w-full">
        {/* Location */}
        <div className="flex items-center gap-2 text-sm">
          <CiLocationOn />
          <p className="truncate">{location}</p>
        </div>

        {/* Title */}
        <p className="font-semibold text-lg mt-1 truncate">{title}</p>

        {/* Date & Time */}
        <div className="flex justify-between items-center mt-2 text-sm">
          <div className="flex items-center gap-1">
            <CiCalendarDate />
            <p>{date}</p>
          </div>
          <div className="flex items-center gap-1">
            <CiTimer />
            <p>{time}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard
