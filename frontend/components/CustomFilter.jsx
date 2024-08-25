"use client";

import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useState } from 'react';

const CustomFilter = ({title, options}) => {
    const [selected, setSelected] = useState(options[0]);

  return (
    <>
      <Listbox value={selected} onChange={(e)=> {setSelected(e)}}>
        <div className='relative w-fit z-10'>
        <ListboxButton className="relative w-full w-min-[127px] flex justify-between items-center cursor-default rounded-lg bg-gray-200 py-2 px-3 text-left sm:text-sm border">
          <span className="block truncate">
            {selected.title}
          </span>
          <Image src="/chevron-down.svg" width={20} height={20} alt='chevron down'/>
        </ListboxButton>
        <Transition as={Fragment} leave='transition ease-in duration-300' leaveFrom='opacity-100' leaveTo='opacity-0'>
          <ListboxOptions className="absolute max-h-60 mt-1 w-full overflow-auto rounded-md bg-gray-200 py-1 text-base shadow-lg cursor-default">
            {options.map((option)=> (
              <ListboxOption key={option.title} value={option} className={(({focus})=> `relative select-none py-2 px-4 ${focus ? 'bg-gray-300 font-medium' : 'text-gray-900'}`)}>
                {({selected})=> (
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                    {option.title}
                  </span>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
        </div>
      </Listbox>
    </>
  )
}

export default CustomFilter
