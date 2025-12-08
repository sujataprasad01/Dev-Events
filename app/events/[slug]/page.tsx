import React from "react";
import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";

const events = [
  {
    title: "Event 1",
    slug: "event-1",
    location: "New York, USA",
    date: "2024-09-15",
    time: "18:00",
    image: "/images/event1.jpeg",
  },
  {
    title: "Event 2",
    slug: "event-2",
    location: "California, USA",
    date: "2024-10-02",
    time: "10:00",
    image: "/images/event1.jpeg",
  },
  {
    title: "Event 3",
    slug: "event-3",
    location: "Berlin, Germany",
    date: "2024-11-20",
    time: "14:00",
    image: "/images/event1.jpeg",
  },
  {
    title: "Event 4",
    slug: "event-4",
    location: "Tokyo, Japan",
    date: "2024-12-05",
    time: "09:00",
    image: "/images/event1.jpeg",
  },
];

const Page = () => {
  return (
    <section className="mt-8">
      <h1 className="text-xl text-center">
        The Hub for Every Developer <br /> Event You Can't Miss
      </h1>

      <p className="text-xl text-center mt-5">
        Hackathons, Meetup, and Conferences, All in One Place
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events.map((event) => (
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
