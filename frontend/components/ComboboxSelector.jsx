"use client";

import { Combobox, ComboboxButton, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ComboboxSelector = ({value, onChange, options}) => {
  return (
    <>
      <Combobox value={value} onChange={onChange}>
              <div className="w-full p-3 mb-4 rounded-lg bg-blue-50">
                <ComboboxButton className="w-full text-sm text-left text-gray-700">
                  {value || "Select an option"}
                </ComboboxButton>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ComboboxOptions className="relative z-10 w-full mt-1 overflow-auto text-sm bg-white rounded-md shadow-lg max-h-60 focus:outline-none">
                    {options.map((item) => (
                      <ComboboxOption
                        key={item}
                        value={item}
                        className={({ active }) =>
                          `cursor-pointer select-none p-2 ${
                            active
                              ? "bg-primaryblue text-white"
                              : "text-gray-900"
                          }`
                        }
                      >
                        {item}
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </Transition>
              </div>
            </Combobox>
    </>
  )
}

export default ComboboxSelector
