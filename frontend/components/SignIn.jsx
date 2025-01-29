"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { AuthModal } from ".";
import ForgotPasswordModal from "./ForgotPasswordModal";
import UserContext from "../context/UserContext";
import Image from "next/image";

const SignIn = () => {
  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [modalType, setModalType] = useState(null);
  const [isvisible, setIsvisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalIconColor, setModalIconColor] = useState("");
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const router = useRouter();
  const { loginUser } = useContext(UserContext);

  const handleSignIn = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // username,
        email,
        password,
      }),
    });

    if (response.status === 200) {
      // alert("Login successfull.");
      const res = await response.json();
      loginUser(res.data.user);
      // setModalType("success-login");
      setModalTitle("Login Successful!");
      setModalMessage("Welcome back! You have successfully logged in.");
      setModalIconColor("bg-blue-500");
      setIsvisible(true);
    } else {
      // setModalType("error-login");
      setModalTitle("Login Unsuccessful");
      setModalMessage("Invalid credentials. Please try again.");
      setModalIconColor("bg-red-500");
      setIsvisible(true);
      // alert("Login failed.");
    }
    // setUsername('');
    setEmail("");
    setPassword("");
    setIsLoading(false);
    // router.push("/home");
  };

  return (
    <>
      <div className="flex w-full p-0">
        <div className="flex-1 w-2/3 bg-gray-50 lg:px-24 py-32 items-center justify-center">
          <h1 className="mb-8 text-4xl font-bold text-center">
            Sign In to PANKH
          </h1>
          <form className="w-full p-8" onSubmit={handleSignIn}>
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter email"
              className="block w-full p-4 mb-4 text-sm bg-white rounded-lg"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label>Password</label>
            <div className="flex w-full bg-white rounded-lg justify-between p-0 mb-4">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter your password"
                className="block w-3/4 pt-4 px-2 mb-4 text-sm bg-white rounded-lg focus:outline-none"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className="text-primaryblue text-sm hover:text-primarydarkblue lg:mr-4 opacity-50"
              >
                {isPasswordVisible ? (
                  <Image
                    src="/assets/images/crossed-eye.svg"
                    alt="don't show passsword"
                    height={20}
                    width={20}
                  />
                ) : (
                  <Image
                    src="/assets/images/eye.svg"
                    alt="show password"
                    height={20}
                    width={20}
                  />
                )}
              </button>
            </div>
            <div className="flex w-full justify-between px-10">
              {isLoading ? (
                <TailSpin
                  type="Tailspin"
                  color="#00BFFF"
                  height={50}
                  width={50}
                />
              ) : (
                <button
                  type="submit"
                  className="bg-primaryblue h-12 w-1/3 text-white rounded-md hover:bg-primarydarkblue"
                >
                  Sign In
                </button>
              )}
              <button
                className="text-primaryblue text-sm hover:text-primarydarkblue"
                type="button"
                onClick={() => setForgotPasswordModalOpen(true)}
              >
                Forgot Password?
              </button>
            </div>
          </form>

          <div className=" mt-10 lg:hidden">
            <p className="text-center text-sm mt-4">
              New to PANKH?{" "}
              <a
                href="/sign-up"
                className="text-primaryblue hover:text-primarydarkblue"
                onClick={() => {
                  setIsLoading(true);
                }}
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
        <div className="flex-1 min-h-screen w-1/3 bg-[url('/assets/images/Signin.png')] hidden bg-cover bg-center lg:flex">
          <div className="w-full h-full bg-black bg-opacity-20 justify-center items-center text-white lg:flex flex-col">
            <h1 className="mb-8 text-4xl font-semibold">
              First time at PANKH?
            </h1>
            <h4 className="text-sm mb-6">
              Sign Up to join in on a wonderful journey.
            </h4>
            <div>
              <button className="bg-gray-300 bg-opacity-60 text-sm h-10 w-24 rounded-sm">
                <Link
                  href="/sign-up"
                  onClick={() => {
                    setIsLoading(true);
                  }}
                >
                  Sign Up
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <AuthModal
        isVisible={isvisible}
        title={modalTitle}
        message={modalMessage}
        iconColor={modalIconColor}
        onClose={() => setIsvisible(false)}
      />
      {forgotPasswordModalOpen && (
        <ForgotPasswordModal
          onClose={() => setForgotPasswordModalOpen(false)}
        />
      )}
    </>
  );
};

export default SignIn;
