"use client";

import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Transition, TransitionChild } from "@headlessui/react";

const ReviewCardModal = ({ onClose }) => {
  const noOfStars = 5; // Hardcoded number of stars
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  
  function handleClick(getCurrentIndex) {
    setRating(getCurrentIndex);
  }

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHover(rating);
  }

  useEffect(() => {
    setTimeout(() => {
      setModalVisible(true);
    }, 50);
  }, []);

  return (
    <Transition show={modalVisible} as="div">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <TransitionChild
          as="div"
          enter="ease-out duration-500"
          enterFrom="opacity-0 translate-y-4"
          enterTo="opacity-100 translate-y-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-4"
        >
          <div className="w-full max-w-lg p-6 bg-white rounded shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-900">How was your experience ?</h3>

            {/* stars */}
            <div className="flex pb-4 space-x-2">
              {[...Array(noOfStars)].map((_, index) => {
                index += 1;

                return (
                  <FaStar
                    key={index}
                    className={`cursor-pointer ${
                      index <= (hover || rating)
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleClick(index)}
                    onMouseMove={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave()}
                    size={40}
                  />
                );
              })}
            </div>

            {/* input */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Write your review here"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                //   value={}
              />

              {/* Submit button */}
              <button
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                //   onClick={}
              >
                Submit
              </button>
            </div>

            {/* Cancel button */}
            <button
              onClick={onClose}
              className="mt-6 text-sm text-blue-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </TransitionChild>
      </div>
    </Transition>
  );
};

export default ReviewCardModal;
