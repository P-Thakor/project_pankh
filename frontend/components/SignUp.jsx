"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { AuthModal } from ".";
import Image from "next/image";
import {
  Combobox,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { institutes } from "@/constants";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [institute, setInstitute] = useState("");
  const [showInstitutes, setShowInstitutes] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [modalType, setModalType] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalIconColor, setModalIconColor] = useState("");
  const [isvisible, setIsvisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const [collegeId, setCollegeId] = useState("");
  // const [role, setRole] = useState("other");

  const router = useRouter();

  const handleSignUp = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let collegeId = "";
    let role = "other";
    if (email.endsWith("@charusat.edu.in")) {
      collegeId = email.split("@")[0];
      role = "user";
      // setCollegeId(id);
      // setRole("user");
    } else if (email.endsWith("@charusat.ac.in")) {
      // setRole("faculty-member");
      role = "faculty-member";
    }
    if (password !== confirmPassword) {
      // alert("Passwords do not match");
      setModalTitle("Sign Up Unsuccessful");
      setModalMessage("Passwords do not match. Please try again.");
      setModalIconColor("bg-red-500");
      setIsvisible(true);
      setIsLoading(false);
      return;
    }
    const response = await fetch("http://localhost:8000/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        contactNumber,
        collegeId,
        role,
        institute,
      }),
    });

    // const data = await response.json();
    console.log(response);
    if (response.status === 201) {
      setModalTitle("Registration Successful!");
      switch (role) {
        case "faculty-member":
          setModalMessage(
            "Welcome! You have successfully registered as a faculty."
          );
          setModalIconColor("bg-green-500");
          break;
        case "user":
          setModalMessage(
            "Welcome! You have successfully registered as a student."
          );
          setModalIconColor("bg-green-500");
          break;

        default:
          setModalMessage(
            "Welcome! You have successfully registered as a user."
          );
          setModalIconColor("bg-blue-500");
          break;
      }
      setIsvisible(true);
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    } else {
      setModalTitle("Registration Unsuccessful");
      setModalMessage("Registration failed. Please try again.");
      setModalIconColor("bg-red-500");
      setIsvisible(true);
    }
    setIsLoading(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSetInstitute = (value) => {
    setInstitute(value);
  };

  return (
    <div className="flex w-full p-0">
      <div className="flex-1 min-h-screen w-1/3 bg-[url('/assets/images/Signup.png')] bg-cover bg-center justify-center items-center hidden text-white lg:flex flex-col ">
        <h1 className="mb-8 text-4xl font-semibold">Already a User?</h1>
        <h4 className="text-sm mb-6">Sign In to continue your journey</h4>
        <div>
          <Link href="/sign-in">
            <button className="bg-gray-300 bg-opacity-60 text-sm h-10 w-24 rounded-sm">
              Sign In
            </button>
          </Link>
        </div>
      </div>
      <div className="flex-1 w-2/3 bg-gray-50 lg:px-24 py-32 items-center justify-center">
        <h1 className="mb-8 text-4xl font-bold text-center">
          Sign Up to PANKH
        </h1>
        <form className="w-full p-8" onSubmit={handleSignUp}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="block w-full p-4 mb-4 text-sm bg-white rounded-lg"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="block w-full p-4 mb-4 text-sm bg-white rounded-lg"
          />
          <label>Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter mobile number"
            name="contact"
            value={contactNumber}
            onChange={(e) => {
              setContactNumber(e.target.value);
            }}
            className="block w-full p-4 mb-4 text-sm bg-white rounded-lg"
          />
          <label>Institute</label>
          <div className="flex relative justify-center items-center">
            <Combobox value={institute} onChange={handleSetInstitute}>
              <div className="w-full bg-white rounded-lg p-4 mb-4">
                <ComboboxButton className="w-full text-left">
                  {institute || "Select an institute"}
                </ComboboxButton>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ComboboxOptions className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md overflow-auto focus:outline-none">
                    {institutes.map((item) => (
                      <ComboboxOption
                        key={item}
                        value={item}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-primaryblue text-white"
                              : "bg-white text-gray-900"
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
          </div>
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
          {/* <input
            type="password"
            placeholder="Enter a password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="block w-full p-4 mb-4 text-sm bg-white rounded-lg"
          /> */}
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-type password"
            className="block w-full p-4 mb-4 text-sm bg-white rounded-lg"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
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
                Sign Up
              </button>
            )}
          </div>
        </form>

        <div className=" mt-10 lg:hidden">
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a href="#" className="text-primaryblue hover:text-primarydarkblue">
              Sign In
            </a>
          </p>
        </div>
      </div>
      <AuthModal
        isVisible={isvisible}
        title={modalTitle}
        message={modalMessage}
        iconColor={modalIconColor}
        onClose={() => setIsvisible(false)}
      />
    </div>
  );
};

export default SignUp;
