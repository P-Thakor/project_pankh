const ContactUsPage = () => {
  return (
    <>
    <h1 className="mt-10 text-3xl font-semibold text-center text-blue-600">For any query or problem contact us</h1>
    <div className="flex flex-col items-center min-h-screen p-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col items-center p-4 bg-blue-100 border border-blue-200 rounded-lg shadow-md">
          <img
            src="/assets/images/parth.png"
            alt="Parth Thakor"
            className="object-cover w-40 h-40 mb-3 rounded-full"
          />
          <h1 className="text-2xl">Parth Thakor</h1>
          <h2 className="mt-1 text-xl">22DCE124</h2>
          <h2 className="text-xl">Project Manager & Frontend Developer</h2>
          <div className="flex items-center justify-center">
            <h3 className="text-lg">Phone:</h3>
            <p className="ml-2 text-blue-600">+91 7490001678</p>
          </div>
          <div className="flex justify-center">
            <h3>Email:</h3>
            <p className="ml-2 text-blue-600">22dce124@charusat.edu.in</p>
          </div>
        </div>

        <div className="flex flex-col items-center p-4 bg-blue-100 border border-blue-200 rounded-lg shadow-md">
          <img
            src="/assets/images/kandarp.jpg"
            alt="Kandarp Vyas"
            className="object-cover w-40 h-40 mb-3 rounded-full"
          />
          <h1 className="text-2xl">Kandarp Vyas</h1>
          <h2 className="mt-1 text-xl">22DCE133</h2>
          <h2 className="text-xl">Backend Developer</h2>
          <div className="flex items-center justify-center">
            <h3 className="text-lg">Phone:</h3>
            <p className="ml-2 text-blue-600">+91 8511123848</p>
          </div>
          <div className="flex justify-center">
            <h3>Email:</h3>
            <p className="ml-2 text-blue-600">22dce133@charusat.edu.in</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUsPage;
