export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("search") || "tech";
  const location = searchParams.get("location") || "";
  const online = searchParams.get("online") || "";
  const date = searchParams.get("date") || "";

  let url = `https://www.eventbriteapi.com/v3/events/search/?q=${search}&expand=venue,logo`;

  if (location) url += `&location.address=${location}`;
  if (online === "true") url += `&online_events=true`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.EVENTBRITE_API_KEY}`,
    },
  });

  const data = await res.json();

  console.log("EVENTBRITE RESPONSE:", data); // for debugging

  return Response.json(data);
}
