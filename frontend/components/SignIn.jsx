"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

const SignIn = () => {
  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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

    console.log(response.status);
    if (response.status === 200) {
      alert("Login successfull.");
      router.push("/home");
    } else {
      alert("Login failed.");
    }
    // setUsername('');
    setEmail("");
    setPassword("");
    setIsLoading(false);
  };

  return (
    <div className="flex w-full p-0">
      <div className="flex-1 w-2/3 bg-gray-50 lg:px-24 py-32 items-center justify-center">
        <h1 className="mb-8 text-4xl font-bold text-center">
          Sign In to PANKH
        </h1>
        <form className="w-full p-8" onSubmit={handleSignIn}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            className="block w-full p-4 mb-4 text-sm bg-white rounded-lg"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter a password"
            className="block w-full p-4 mb-4 text-sm bg-white rounded-lg"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="flex w-full justify-between px-10">
            {isLoading ? (
              <TailSpin type="Tailspin" color="#00BFFF" height={50} width={50} />
            ) : (
              <button
                type="submit"
                className="bg-primaryblue h-12 w-1/3 text-white rounded-md hover:bg-primarydarkblue"
              >
                Sign In
              </button>
            )}
            <button className="text-primaryblue text-sm hover:text-primarydarkblue">
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
              onClick={() => {setIsLoading(true)}}
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
      <div className="flex-1 min-h-screen w-1/3 bg-[url('/assets/images/Signin.png')] hidden bg-cover bg-center lg:flex">
        <div className="w-full h-full bg-black bg-opacity-20 justify-center items-center text-white lg:flex flex-col">
          <h1 className="mb-8 text-4xl font-semibold">First time at PANKH?</h1>
          <h4 className="text-sm mb-6">
            Sign Up to join in on a wonderful journey.
          </h4>
          <div>
            <button className="bg-gray-300 bg-opacity-60 text-sm h-10 w-24 rounded-sm">
              <Link href="/sign-up" onClick={()=>{setIsLoading(true)}}>Sign Up</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
