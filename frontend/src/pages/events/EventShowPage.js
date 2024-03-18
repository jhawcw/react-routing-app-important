import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../../components/EventItem";

const EventShowPage = () => {
  const data = useRouteLoaderData("event-detail");
  const event = data.event;
  return <EventItem event={event} />;
};

export default EventShowPage;

export async function loader({ request, params }) {
  const id = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json({ message: "Unable to get that event id details" }, { status: 500 });
  } else {
    return response;
  }
}

export async function action({ params, request }) {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });
  console.log(response);

  if (!response.ok) {
    throw json({ message: "Cannot delete event!" }, { status: 500 });
  }
  return redirect("/events");
}
