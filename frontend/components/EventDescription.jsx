import { formattedDate, formattedTime } from "@/utils";

const EventDescription = ({ event }) => {


  const eventData = event;
  return (
    <div className="flex gap-20 flex-wrap p-10 items-center lg:justify-center">
      <div>
        <div className="mb-12">
          <h2 className="text-2xl font-bold">Description</h2>
          <p className="text-gray-500 mt-4">{eventData.description}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold">Timings</h2>
          <p className="text-gray-500 mt-4">
            Start: {formattedDate(eventData.startDate)}, {formattedTime(eventData.startTime)}
          </p>
          <p className="text-gray-500">
            End: {formattedDate(eventData.endDate)}, {formattedTime(eventData.endTime)}
          </p>
        </div>
      </div>
      <div>
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Event Location</h2>
          <p className="text-gray-500">{eventData.locations}</p>
        </div>

        <div className="mb-12">
          <h4 className="text-xl font-semibold mb-2">{eventData.name}</h4>
          <p className="text-gray-500">{eventData.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default EventDescription;
