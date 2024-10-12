import React from "react";

const ClubDetails = ({ club }) => {
  return (
    <>
      <section>
        <div className="container px-10 py-10 mx-auto">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-primaryblue">{club.name}</h1>
            <p className="mt-5 text-lg">{club.description}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClubDetails;
