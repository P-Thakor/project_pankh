"use client";

import React, { useEffect, useState } from "react";
import { Transition, TransitionChild } from "@headlessui/react";
import {
  CheckCircleIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { forgotPassword, resetPassword } from "@/utils";

const ForgotPasswordModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null); // 'success', 'error', null
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSendOtp = () => {
    setLoading(true);

    forgotPassword(email)
      .then(() => {
        setMessage("OTP sent successfully to your email.");
        setMessageType("success");
        // setTimeout(() => {
        //   setStep(2)
        // }, 1500
        // );
        setStep(2);
      })
      .catch((err) => {
        setMessage(err.message || "There is no user with email address.");
        setMessageType("error");
      })
      .finally(() => {
        setLoading(false);
      });

    // Simulating an API call
    // setTimeout(() => {
    //   setLoading(false);
    //   setMessage("OTP sent successfully to your email.");
    //   setMessageType("success");
    //   setStep(2);
    // }, 1000);
  };

  const handleVerifyOtp = () => {
    setLoading(true);

    resetPassword(otp)
      .then(() => {
        setMessage("OTP verified successfully.");
        setMessageType("success");
        setStep(3);
      })
      .catch((err) => {
        setMessage(err.message || "Invalid OTP.");
        setMessageType("error");
      })
      .finally(() => {
        setLoading(false);
      });

    // Simulating OTP verification
    // setTimeout(() => {
    //   setLoading(false);
    //   setMessage("OTP verified successfully.");
    //   setMessageType("success");
    //   setStep(3);
    // }, 1000);
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    fetch("http://localhost:8000/api/v1/auth/changePassword", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: newPassword }),
    })
      .then((res) => {
        setMessage("Password reset successful!");
        setMessageType("success");
        setTimeout(onClose, 1500); // Close modal after a short delay
      })
      .catch((err) => {
        setMessage(err.message || "Failed to reset password.");
        setMessageType("error");
      });

    // Simulating password reset
    // setTimeout(() => {
    //   setLoading(false);
    //   setMessage("Password reset successful!");
    //   setMessageType("success");
    //   setTimeout(onClose, 1500); // Close modal after a short delay
    // }, 1000);
  };

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
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Forgot Password
            </h3>
            {message && (
              <div
                className={`p-4 rounded mb-4 ${
                  messageType === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {messageType === "success" ? (
                      <CheckCircleIcon className="h-5 w-5" />
                    ) : (
                      <XMarkIcon className="h-5 w-5" />
                    )}
                  </div>
                  <p className="ml-3 text-sm">{message}</p>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                  onClick={handleSendOtp}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="New Password"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                  onClick={handleResetPassword}
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            )}

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

export default ForgotPasswordModal;
