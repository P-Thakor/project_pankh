import { formattedDate, formattedTime } from "@/utils";
import Link from "next/link";
import Image from "next/image";

const EventDescription = ({ event }) => {
  return (
    <div className="flex flex-col items-center gap-10 px-5 py-5 sm:flex-row sm:px-20 sm:py-10">
      {/* Left Section: Event Poster */}
      <div className="flex flex-col items-center w-full sm:w-1/2">
        <h2 className="mb-4 text-xl font-semibold text-primaryblue">
          Event Poster
        </h2>
        <Link href={`/view-event/${event._id}`}>
          <Image
            src={event.coverImage || "/assets/images/Event.png"}
            alt="Event Poster"
            width={500}
            height={500}
            className="object-contain border border-gray-300 rounded-lg shadow-md"
          />
        </Link>
      </div>

      {/* Right Section: Event Details */}
      <div className="w-full sm:w-1/2">
        {/* Description */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl font-bold text-center sm:text-2xl text-primaryblue sm:text-left">
            Description
          </h2>
          <p className="mt-2 text-center text-gray-500 sm:mt-4 sm:text-left whitespace-pre-wrap">
            {event.description}
          </p>
        </div>

        {/* Date & Time */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-center sm:text-2xl text-primaryblue sm:text-left">
            Date & Time
          </h2>
          <p className="mt-2 text-center text-gray-500 sm:mt-4 sm:text-left">
            Start: {formattedDate(event.startDate)},{" "}
            {formattedTime(event.startTime)}
          </p>
          <p className="text-center text-gray-500 sm:text-left">
            End: {formattedDate(event.endDate)}, {formattedTime(event.endTime)}
          </p>
        </div>

        {/* Location */}
        <div className="mb-4 sm:mb-12">
          <h2 className="mb-2 text-xl font-bold text-center sm:mb-4 sm:text-2xl text-primaryblue sm:text-left">
            Event Location
          </h2>
          <p className="mt-4 mb-5 text-center text-gray-500 sm:text-left">
            {event.locations}
          </p>
          {event.Registration?.deadline && (
            <>
              <h2 className="mb-2 text-xl font-bold text-center sm:mb-4 sm:text-2xl text-primaryblue sm:text-left">
                Registration Deadline
              </h2>
              <p className="text-center text-gray-500 sm:text-left">
                {formattedDate(event.Registration.deadline)},{" "}
                {formattedTime(event.Registration.deadline)}
              </p>
            </>
          )}
        </div>

        {/* Summary */}
        {event.summary && (
          <div className="mb-8 sm:mb-12">
            <h4 className="mb-1 text-lg font-semibold text-center sm:mb-2 sm:text-xl sm:text-left">
              {event.name}
            </h4>
            <p className="text-center text-gray-500 sm:text-left">
              {event.summary}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDescription;
