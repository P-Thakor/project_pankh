import { ClubDetails, ClubHero } from "@/components";
import List from "@/components/EventsList/List";
import { fetchClubById, fetchEvents } from "@/utils";

const ClubPage = async ({params}) => {

    const clubData = await fetchClubById(params.id);
    // console.log(clubData);
    const events = await fetchEvents();

  return (
    <>
      <ClubHero />
      <ClubDetails club={clubData} />
      <div className="flex w-1/2 mb-4 sm:mb-0 sm:px-24">
          <h1 className="mr-3 text-4xl font-semibold">Club</h1>
          <h1 className="text-4xl font-semibold text-primaryblue">Events</h1>
        </div>
      <List list={events} />
    </>
  );
};

export default ClubPage;
