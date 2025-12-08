export async function GET(req, { params }) {
  const { id } = params;

  const url = `https://www.eventbriteapi.com/v3/events/${id}/?expand=venue,logo`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.EVENTBRITE_API_KEY}`,
    },
  });

  const data = await res.json();
  return Response.json(data);
}
