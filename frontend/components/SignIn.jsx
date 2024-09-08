const SignIn = () => {
  return (
    <div className="flex w-full p-0">
      <div className="flex-1 w-2/3 bg-gray-50 lg:px-24 py-32 items-center justify-center">
        <h1 className="mb-8 text-4xl font-bold text-center">
          Sign In to PANKH
        </h1>
        <form className="w-full p-8">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email address"
            className="block w-full p-4 mb-4 text-sm bg-white rounded-lg"
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter a password"
            className="block w-full p-4 mb-4 text-sm bg-white rounded-lg"
          />
        </form>
        <div className="flex w-full justify-between px-10">
          <button
            type="submit"
            className="bg-primaryblue h-12 w-1/3 text-white rounded-md hover:bg-primarydarkblue"
          >
            Sign In
          </button>
          <button
            type="submit"
            className="text-primaryblue text-sm hover:text-primarydarkblue"
          >
            Forgot Password?
          </button>
        </div>
        <div className=" mt-10 lg:hidden">
          <p className="text-center text-sm mt-4">
            New to PANKH?{" "}
            <a href="#" className="text-primaryblue hover:text-primarydarkblue">
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
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
