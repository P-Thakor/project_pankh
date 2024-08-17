import events from "./dummyData";
import List from "./List";

const EventsList = () => {
  return (
    <div className="mt-6">
      <List list={events} />
    </div>
  );
};

export default EventsList;
