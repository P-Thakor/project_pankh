"use client";

import { useRouter } from "next/navigation";

const GenerateReportButton = ({eventId = ""}) => {

    const router = useRouter();

    const handleGenerateReport = async() => {
        router.push(`http://localhost:8001/api/v1/event/generateEventReport/${eventId}`);
    }
  return (
    <>
      <button className="custom-btn mt-4" type="button" onClick={handleGenerateReport}>
        Generate Report
      </button>
    </>
  )
}

export default GenerateReportButton
