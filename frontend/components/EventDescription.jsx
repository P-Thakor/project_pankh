const EventDescription = ({ event }) => {
  return (
    <div className="flex gap-20 flex-wrap p-10">
      <div>
        <div className="mb-12">
          <h2 className="text-2xl font-bold">Description</h2>
          <p className="text-gray-500 mt-4">{event.description}</p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold">Timings</h2>
          <p className="text-gray-500 mt-4">
            Start: {event.startDate}, {event.startTime}
          </p>
          <p className="text-gray-500">
            End: {event.endDate}, {event.endTime}
          </p>
        </div>
      </div>
      <div>
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Event Location</h2>
          <p className="text-gray-500">{event.locations}</p>
        </div>

        <div className="mb-12">
          <h4 className="text-xl font-semibold mb-2">{event.name}</h4>
          <p className="text-gray-500">{event.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDescription;
