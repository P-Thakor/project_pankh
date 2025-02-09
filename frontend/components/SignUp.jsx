"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { AuthModal } from ".";
import Image from "next/image";
import { departments, institutes } from "@/constants";
import ComboboxSelector from "./ComboboxSelector";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [institute, setInstitute] = useState("");
  const [department, setDepartment] = useState("");
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
    try {
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
      const response = await fetch("http://localhost:8001/api/v1/auth/signup", {
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
          department,
        }),
      });
  
      const data = await response.json();
      console.log(data);
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
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsvisible(true);
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000);
      } else {
        setModalTitle("Registration Unsuccessful");
        // setModalMessage("Registration failed. Please try again.");
        setModalMessage(data.message);
        setModalIconColor("bg-red-500");
        setIsvisible(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSetInstitute = (value) => {
    setInstitute(value);
  };

  const handleSetDepartment = (value) => {
    setDepartment(value);
  };

  return (
    <div className="flex w-full p-0">
      <div className="min-h-screen w-1/2 bg-[url('/assets/images/signInBG.png')] bg-cover bg-center justify-center items-center hidden text-white lg:flex flex-col ">
        {/* <h1 className="mb-8 text-4xl font-semibold">Already a User?</h1>
        <h4 className="mb-6 text-sm">Sign In to continue your journey</h4>
        <div>
          <Link href="/sign-in">
            <button className="w-24 h-10 text-sm bg-gray-300 rounded-sm bg-opacity-60">
              Sign In
            </button>
          </Link>
        </div> */}
      </div>
      <div className="flex flex-col items-center justify-center w-full px-8 py-16 bg-gray-100 lg:w-1/2 lg:px-24">
        <form
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
          onSubmit={handleSignUp}
        >
          <h1 className="mb-6 text-3xl font-bold text-center lg:text-4xl">
            <span className="text-primaryblue">Sign Up</span> to PANKH
          </h1>
          <label className="block mb-2 text-sm font-medium">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full p-3 mb-4 text-sm rounded-lg bg-blue-50 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            className="w-full p-3 mb-4 text-sm rounded-lg bg-blue-50 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block mb-2 text-sm font-medium">
            Mobile Number
          </label>
          <input
            type="tel"
            placeholder="Enter mobile number"
            className="w-full p-3 mb-4 text-sm rounded-lg bg-blue-50 focus:outline-none"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />

          <label className="block mb-2 text-sm font-medium">Institute</label>
          <div className="relative">
            <ComboboxSelector value={institute} onChange={handleSetInstitute} options={institutes} />
          </div>

          <label className="block mb-2 text-sm font-medium">Department</label>
          <div className="relative">
            <ComboboxSelector value={department} onChange={handleSetDepartment} options={departments} />
          </div>

          <label className="block mb-2 text-sm font-medium">Password</label>
          <div className="flex items-center w-full p-3 mb-4 rounded-lg bg-blue-50">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter your password"
              className="flex-1 text-sm bg-transparent focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              className="text-primaryblue hover:text-primarydarkblue"
            >
              {isPasswordVisible ? (
                <Image
                  src="/assets/images/crossed-eye.svg"
                  alt="Hide Password"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/assets/images/eye.svg"
                  alt="Show Password"
                  width={20}
                  height={20}
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

          <label className="block mb-2 text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Re-type password"
            className="w-full p-3 mb-4 text-sm rounded-lg bg-blue-50 focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="flex justify-center mt-6">
            {isLoading ? (
              <TailSpin color="#00BFFF" height={50} width={50} />
            ) : (
              <button
                type="submit"
                className="w-40 h-12 text-white rounded-lg bg-primaryblue hover:bg-primarydarkblue"
              >
                Sign Up
              </button>
            )}
          </div>
          <p className="mt-6 text-sm text-center">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="text-primaryblue hover:text-primarydarkblue"
            >
              Sign In
            </a>
          </p>
        </form>
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
