import { Outlet, useNavigation } from "react-router-dom";
import EventsNavigation from "../../components/EventsNavigation";

const EventRootPage = () => {
  // const navigation = useNavigation();

  return (
    <>
      <EventsNavigation />
      <main>
        {/* {navigation.state === "loading" && <p>Loading data !</p>} */}
        <Outlet />
      </main>
    </>
  );
};

export default EventRootPage;
