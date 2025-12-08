'use client';
import posthog from 'posthog-js';
import React from "react";
import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";

const events = [
  { title: "Event 1 nfjsnk", slug: "event-1", location: "NY", date: "2024", time: "18:00", image: "/images/event1.jpeg" },
  { title: "Event 2", slug: "event-2", location: "CA", date: "2024", time: "10:00", image: "/images/evvent2.jpeg" },
  { title: "Event 3", slug: "event-3", location: "Berlin", date: "2024", time: "14:00", image: "/images/event1.jpeg" },
  { title: "Event 4", slug: "event-4", location: "Tokyo", date: "2024", time: "09:00", image: "/images/event1.jpeg" },
  { title: "Event 5", slug: "event-5", location: "Paris", date: "2024", time: "11:00", image: "/images/event1.jpeg" },
  { title: "Event 6", slug: "event-6", location: "London", date: "2024", time: "16:00", image: "/images/event1.jpeg" },
  { title: "Event 7", slug: "event-7", location: "Tokyo", date: "2024", time: "09:00", image: "/images/event1.jpeg" },
  { title: "Event 8", slug: "event-8", location: "Paris", date: "2024", time: "11:00", image: "/images/event1.jpeg" },
  { title: "Event 9", slug: "event-9", location: "London", date: "2024", time: "16:00", image: "/images/event1.jpeg" },
];


const Page = () => {
  return (
    <section className="mt-8 px-20">
      <h1 className="text-xl text-center">
        The Hub for Every Developer <br /> Event You Can't Miss
      </h1>

      <p className="text-xl text-center mt-5">
        Hackathons, Meetup, and Conferences, All in One Place
      </p>

      <div className="mt-6 flex justify-center" onClick={() => posthog.capture('explore_button_clicked')}>
        <ExploreBtn />
      </div>

      <div className="mt-10 space-y-7">
        <h3 className="text-lg font-semibold">Featured Events</h3>

        {/* GRID: 1 col mobile, 2 sm, 3 lg */}
<ul className="grid grid-cols-3 gap-20">
  {events.map((event) => (
    <li key={event.slug} onClick={() => posthog.capture('event_card_clicked', { event_slug: event.slug, event_title: event.title, event_location: event.location })}>
      <EventCard {...event} />
    </li>
  ))}
</ul>


      </div>
    </section>
  );
};

export default Page;
