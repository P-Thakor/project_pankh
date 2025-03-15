import { FaPhone, FaEnvelope, FaLinkedin } from "react-icons/fa";

const ContactUsPage = () => {
  const contacts = [
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
  ];

  return (
    <>
      <h1 className="mt-10 text-3xl font-semibold text-center text-blue-600">
        For any query or problem, contact us
      </h1>
      <div className="flex flex-col items-center min-h-screen p-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-blue-100 border border-blue-200 rounded-lg shadow-md"
            >
              <img
                src={contact.image}
                alt={contact.name}
                className="object-cover w-40 h-40 mb-3 rounded-full"
              />
              <h1 className="text-2xl font-semibold">{contact.name}</h1>
              <h2 className="mt-1 text-xl">{contact.id}</h2>
              <h2 className="text-xl">{contact.role}</h2>

              {/* Contact Icons */}
              <div className="flex items-center mt-3 space-x-4">
                <a href={`tel:${contact.phone}`} className="text-blue-600">
                  <FaPhone />
                </a>
                <a href={`mailto:${contact.email}`} className="text-blue-600">
                  <FaEnvelope />
                </a>
                <a
                  href={contact.linkedin}
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

export default ContactUsPage;
