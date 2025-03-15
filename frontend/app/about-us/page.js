import { FaPhone, FaEnvelope, FaLinkedin } from "react-icons/fa";

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: "Mr. Jay Patel",
      role: "Assistant Professor | Mentor",
      phone: "+919428153390",
      email: "jaypatel.dce@charusat.ac.in",
      linkedin: "https://www.linkedin.com/in/jrbpatel/",
      image: "/assets/images/jaysir.png",
    },
    {
      name: "Parth Thakor",
      role: "Project Manager & Frontend Developer",
      id: "22DCE124",
      phone: "+917490001678",
      email: "22dce124@charusat.edu.in",
      linkedin: "https://www.linkedin.com/in/parththakor/",
      image: "/assets/images/parth.png",
    },
    {
      name: "Kandarp Vyas",
      role: "Backend Developer",
      id: "22DCE133",
      phone: "+918511123848",
      email: "22dce133@charusat.edu.in",
      linkedin: "https://www.linkedin.com/in/vyaskandarp/",
      image: "/assets/images/kandarp.png",
    },
    {
      name: "Hemax Patel",
      role: "Frontend Developer",
      id: "22DCE069",
      phone: "+918488894484",
      email: "22dce069@charusat.edu.in",
      linkedin: "https://www.linkedin.com/in/hemax-patel/",
      image: "/assets/images/hemax.png",
    },
    {
      name: "Namra Vekariya",
      role: "Backend Developer",
      id: "22DCE131",
      phone: "+917096740206",
      email: "22dce131@charusat.edu.in",
      linkedin: "https://www.linkedin.com/in/namra-vekariya-69b3862a3/",
      image: "/assets/images/namra.png",
    },
    {
      name: "Atmiy Vithani",
      role: "UI/UX Designer",
      id: "22DCE132",
      phone: "+916351818987",
      email: "22dce132@charusat.edu.in",
      linkedin: "https://www.linkedin.com/in/atmiy-vithani-489855263/",
      image: "/assets/images/atmiy.png",
    },
  ];

  return (
    <>
      <div className="p-6 mx-auto bg-white max-w-7xl">
        <h1 className="mt-5 text-3xl font-bold text-center text-blue-600">
          About Us
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-justify text-gray-700">
          Welcome to <span className="font-semibold text-blue-500">PANKH</span>,
          the official Event & Club Management Website of{" "}
          <span className="font-semibold">DEPSTAR</span>. Developed by students
          of Department of Computer Engineering, designed to revolutionize how
          events and clubs are managed at our college. This platform replaces
          traditional offline paperwork with a streamlined digital system,
          making event organization and participation more efficient than ever.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-justify text-gray-700">
          With this platform, students can explore upcoming events, register
          with ease, and stay updated on various activities. Faculty members can
          monitor student attendance at events, ensuring better engagement
          tracking. Additionally, department heads and the principal can access
          detailed insights into student participation, faculty contributions,
          and overall event statistics.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-justify text-gray-700">
          Our goal is to enhance the student experience, provide seamless event
          management, and ensure efficient monitoring of college activities.{" "}
          <span className="font-semibold text-blue-500">
            Built by students, for students
          </span>
          , this platform is a step toward a smarter and more connected campus.
        </p>
      </div>

      <h1 className="mt-5 text-3xl font-bold text-center text-blue-600">
        Project Team
      </h1>
      <div className="flex flex-col items-center min-h-screen p-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-blue-100 border border-blue-200 rounded-lg shadow-md"
            >
              <img
                src={member.image}
                alt={member.name}
                className="object-cover w-40 h-40 mb-3 rounded-full"
              />
              <h1 className="text-2xl font-semibold">{member.name}</h1>
              {member.id && <h2 className="mt-1 text-xl">{member.id}</h2>}
              <h2 className="text-xl">{member.role}</h2>

              <div className="flex items-center mt-3 space-x-4">
                <a href={`tel:${member.phone}`} className="text-blue-600">
                  <FaPhone />
                </a>
                <a href={`mailto:${member.email}`} className="text-blue-600">
                  <FaEnvelope />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
