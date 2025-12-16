import { notFound } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import { CiCalendarDate, CiTimer, CiLocationOn } from 'react-icons/ci'
import { GrCloudComputer } from 'react-icons/gr'
import { FaPeopleGroup } from 'react-icons/fa6'
import BookEvent from '@/components/BookEvent'
import { getSimilarEventsBySlug } from '@/lib/actions/event.actions'
import { IEvent } from '@/database/event.model'
import EventCard from '@/components/EventCard'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const EventDetailItem = ({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ size: number }>
  alt: string
  label: string
}) => (
  <div className="flex items-center gap-2 text-sm ">
    <Icon size={17} />
    <p>{label}</p>
  </div>
)

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <section className="space-y-2">
    <h2 className="text-lg font-semibold">Agenda</h2>
    <ul className="list-disc pl-5 text-sm space-y-1 ">
      {agendaItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </section>
)

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag, index) => (
      <span
        key={index}
        className="px-3 py-1 rounded-full text-xs
        bg-white/10 border border-white/10 backdrop-blur-sm"
      >
        {tag}
      </span>
    ))}
  </div>
)

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const request = await fetch(`${BASE_URL}/api/events/${slug}`)
  const {
    event: {
      description,
      image,
      overview,
      date,
      time,
      location,
      mode,
      agenda,
      audience,
      tags,
      organizer,
    },
  } = await request.json()

  if (!description) return notFound()

  const bookings = 10

  const similarEvents:IEvent[]=await getSimilarEventsBySlug(slug);

  const sanitizedSimilarEvents = similarEvents.map((event: any) => ({
  ...event,
  _id: event._id.toString(),
  createdAt: event.createdAt?.toString(),
  updatedAt: event.updatedAt?.toString(),
}));


  return (
    <section className="max-w-7xl mx-auto px-4 py-10 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Event Description</h1>
        <p className=" mt-2 max-w-3xl">
          {description}
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          <Image
            src={image}
            alt="Event Banner"
            width={900}
            height={400}
            className="w-150 h-140 rounded-lg object-cover
            border border-white/10 shadow"
          />

          {/* Overview */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Overview</h2>
            <p className="text-sm ">{overview}</p>
          </section>

          {/* Event Details */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Event Details</h2>
            <EventDetailItem icon={CiCalendarDate} alt="Date" label={date} />
            <EventDetailItem icon={CiTimer} alt="Time" label={time} />
            <EventDetailItem icon={CiLocationOn} alt="Location" label={location} />
            <EventDetailItem icon={GrCloudComputer} alt="Mode" label={mode} />
            <EventDetailItem icon={FaPeopleGroup} alt="Audience" label={audience} />
          </section>

          <EventAgenda agendaItems={agenda} />

          {/* Organizer */}
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">About the Organizer</h2>
            <p className="text-sm ">{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>

        {/* RIGHT BOOKING CARD */}
        <aside className="lg:col-span-1">
          <div
            className="sticky top-24 rounded-lg p-6
            bg-white/5 border border-white/10 backdrop-blur-xl
            shadow space-y-4"
          >
            <h2 className="text-xl font-semibold">Book Your Spot</h2>

            {bookings > 0 ? (
              <p className="text-sm ">
                Join <span className="font-medium">{bookings}</span> people who
                have already booked!
              </p>
            ) : (
              <p className="text-sm ">
                No bookings yet. Be the first!
              </p>
            )}

            <BookEvent />
          </div>
        </aside>
      </div>

      <div className='flex w-full flex-col gap-4 pt-20'>
        <h2>Similar Events</h2>
        <div className='events'>
     {similarEvents.length > 0 &&
  similarEvents.map((event) => (
    <EventCard
      key={event.slug}
      title={event.title}
      image={event.image}
      slug={event.slug}
      location={event.location}
      date={event.date}
      time={event.time}
    />
))}
        </div>
      </div>
    </section>
  )
}

export default EventDetailsPage
