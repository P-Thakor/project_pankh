import { formattedDate, formattedTime } from "@/utils";

const EventDescription = ({ event }) => {
  const eventData = event;
  console.log(eventData);
  return (
    <div className="flex flex-col items-center gap-10 px-5 py-5 sm:flex-row sm:gap-20 sm:px-20 sm:py-10">
      <div className="w-full sm:w-1/2 flex-left">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl font-bold text-center sm:text-2xl text-primaryblue sm:text-left">
            Description
          </h2>
          <p className="mt-2 text-center text-gray-500 sm:mt-4 sm:text-left">
            {eventData.description}
          </p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-center sm:text-2xl text-primaryblue sm:text-left">
            Date & Time
          </h2>
          <p className="mt-2 text-center text-gray-500 sm:mt-4 sm:text-left">
            Start: {formattedDate(eventData.startDate)},{" "}
            {formattedTime(eventData.startTime)}
          </p>
          <p className="text-center text-gray-500 sm:text-left">
            End: {formattedDate(eventData.endDate)},{" "}
            {formattedTime(eventData.endTime)}
          </p>
        </div>
      </div>

      <div className="w-full sm:w-1/2 flex-right">
        <div className="mb-8 sm:mb-12">
          <h2 className="mb-2 text-xl font-bold text-center sm:mb-4 sm:text-2xl text-primaryblue sm:text-left">
            Event Location
          </h2>
          <p className="text-center text-gray-500 sm:text-left">
            {eventData.locations}
          </p>
        </div>

        {eventData.summary && (
          <div className="mb-8 sm:mb-12">
            <h4 className="mb-1 text-lg font-semibold text-center sm:mb-2 sm:text-xl sm:text-left">
              {eventData.name}
            </h4>
            <p className="text-center text-gray-500 sm:text-left">
              {eventData.summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDescription;
