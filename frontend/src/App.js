// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage done
//    - EventsPage done
//    - EventDetailPage done
//    - NewEventPage done
//    - EditEventPage done
// 2. Add routing & route definitions for these five pages
//    - / => HomePage done
//    - /events => EventsPage done
//    - /events/<some-id> => EventDetailPage done
//    - /events/new => NewEventPage done
//    - /events/<some-id>/edit => EditEventPage done
// 3. Add a root layout that adds the <MainNavigation> component above all page components done
// 4. Add properly working links to the MainNavigation done
// 5. Ensure that the links in MainNavigation receive an "active" class when active done
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage done
// 7. Output the ID of the selected event on the EventDetailPage done
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components done

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import EventsPage, { loader as eventsLoader } from "./pages/events/EventIndexPage";
import ErrorPage from "./pages/ErrorPage";
import EventCreatePage from "./pages/events/EventCreatePage";
import EventShowPage, {
  loader as eventLoader,
  action as deleteEventAction,
} from "./pages/events/EventShowPage";
import EventEditPage from "./pages/events/EventEditPage";
import EventRootPage from "./pages/events/EventRootPage";
import { action as manipulateEventAction } from "./components/EventForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "events",
        element: <EventRootPage />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventLoader,
            children: [
              { index: true, element: <EventShowPage />, action: deleteEventAction },
              { path: "edit", element: <EventEditPage />, action: manipulateEventAction },
            ],
          },

          { path: "create", element: <EventCreatePage />, action: manipulateEventAction },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
