import React from "react";
import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

const BASE_URL=process.env.NEXT_PUBLIC_BASE_URL;

const Page = async() => {
  'use cache';
  cacheLife('hours');

  const response=await fetch(`${BASE_URL}/api/events`);
  const {events}= await response.json();
  return (
    <section className="mt-8 px-20">
      <h1 className="text-xl text-center">
        The Hub for Every Developer <br /> Event You Can't Miss
      </h1>

      <p className="text-xl text-center mt-5">
        Hackathons, Meetup, and Conferences, All in One Place
      </p>

      <div className="mt-6 flex justify-center">
        <ExploreBtn />
      </div>

      <div className="mt-10 space-y-7">
        <h3 className="text-lg font-semibold">Featured Events</h3>

        {/* GRID: 1 col mobile, 2 sm, 3 lg */}
<ul className="grid grid-cols-3 gap-20">
  {events && events.length>0 && events.map((event: IEvent) => (
    <li key={event.slug}>
      <EventCard {...event} />
    </li>
  ))}
</ul>


      </div>
    </section>
  );
};

export default Page;
