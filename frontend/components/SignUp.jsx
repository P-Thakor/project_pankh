"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { AuthModal } from ".";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isvisible, setIsvisible] = useState(false);
  const [collegeId, setCollegeId] = useState("");

  const router = useRouter();

  const handleSignUp = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (email.endsWith("@charusat.edu.in")) {
      const id = email.split("@")[0];
      setCollegeId(id);
      // console.log(id);
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
        collegeId,
      }),
    });

    // const data = await response.json();
    console.log(response.status);
    if (response.status === 201) {
      if (email.endsWith("ac.in")) {
        // alert('Teacher Sign Up successfull.');
        setModalType("success-faculty-signup");
        setIsvisible(true);
      } else {
        // alert('Student Sign Up successfull.');
        setModalType("success-user-signup");
        setIsvisible(true);
      }
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    }
    setIsLoading(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter a password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="block w-full p-4 mb-4 text-sm bg-white rounded-lg"
          />
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
        type={modalType}
        onClose={() => setIsvisible(false)}
      />
    </div>
  );
};

export default SignUp;
