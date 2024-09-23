import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { Fragment, useState } from "react";

const SearchBar = ({ events }) => {
  const [event, setEvent] = useState("");
  const [query, setQuery] = useState("");

  const filteredEvents =
    query === ""
      ? []
      : events.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <form className="" onSubmit={handleSearch}>
      <div>
        <Combobox value={event} onChange={setEvent}>
          <div className="relative w-full">
            <ComboboxInput
              className=""
              placeholder="Search Events"
              displayValue={(event) => event}
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
              <ComboboxOptions>
                {filteredEvents.map((event) => (
                  <ComboboxOption
                    key={event}
                    value={event}
                    className={({ focus }) => {
                      `relative ${
                        focus ? "bg-primaryblue text-white" : "text-gray-900"
                      }`;
                    }}
                  >
                    {event}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Transition>
          </div>
        </Combobox>
      </div>
    </form>
  );
};

export default SearchBar;
