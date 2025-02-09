"use client";

import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const EventAttendancePieChart = ({user}) => {
    const eventsAttended = user.eventsAttended.length || 0;
    const eventsMissed = user.eventsMissed.length || 0;
  
    const data = {
      labels: ["Events Attended", "Events Missed"],
      datasets: [
        {
          data: [eventsAttended, eventsMissed],
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)", // Color for events attended
            "rgba(255, 99, 132, 0.6)", // Color for events missed
          ],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    };
  
    return (
      <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-center mb-4">Event Attendance</h2>
        <Pie data={data} />
        {<p>Events Attended: {eventsAttended}</p>}
        {<p>Events Missed: {eventsMissed}</p>}
      </div>
    );
}

export default EventAttendancePieChart
