"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

const SearchBar = ({ events }) => {
  const [event, setEvent] = useState("");
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filteredEvents =
    query === ""
      ? []
      : events.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  const handleSearch = (e) => {
    e.preventDefault();

    if (!event) {
      return alert("Please enter a event.");
    }
    updateSearchParams(event);
  };
  const updateSearchParams = (event) => {
    const newPathName = `${window.location.origin}/view-event/${event._id}`;
    router.push(newPathName);
    setEvent({});
  };

  const handleSelectEvent = (selectedEvent) => {
    setEvent(selectedEvent);
    setQuery("");
  };

  return (
    <form className="z-20 flex" onSubmit={handleSearch}>
      <div className="relative flex items-center justify-center">
        <Combobox value={event} onChange={handleSelectEvent}>
          <div className="w-full">
            <ComboboxInput
              className="w-56 p-2 bg-gray-100 rounded-md"
              placeholder="Search Events"
              displayValue={(event) => (event ? event.name : query)}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Transition
              as={Fragment}
              leave="transition ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => {
                setQuery("");
              }}
            >
              <ComboboxOptions className="absolute z-10 w-full mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 focus:outline-none" static>
                {filteredEvents.length === 0 && query !== "" ? (
                  <div className="px-4 py-2 text-gray-500">
                    No results found
                  </div>
                ) : (
                  filteredEvents.map((event) => (
                    <ComboboxOption
                      key={event._id}
                      value={event}
                      className={({ focus }) =>
                        `relative cursor-default rounded-b-md select-none py-2 pl-10 pr-4 ${
                          focus ? "bg-primaryblue text-white" : "bg-white text-gray-900"
                        }`
                      }
                    >
                      {event.name}
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </Transition>
          </div>
          <div>
            <ComboboxButton type="submit">
              <Image
                src="/magnifying-glass.svg"
                alt="magnifying glass"
                height={50}
                width={50}
              />
            </ComboboxButton>
          </div>
        </Combobox>
      </div>
    </form>
  );
};

export default SearchBar;