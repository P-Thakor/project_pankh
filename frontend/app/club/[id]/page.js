import { ClubDetails, ClubHero } from "@/components";
import { fetchClub } from "@/utils";

const ClubPage = async ({params}) => {

    const clubData = await fetchClub(params.id);

  return (
    <>
      <ClubHero />
      <ClubDetails club={clubData} />
    </>
  );
};

export default ClubPage;
