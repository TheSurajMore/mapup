import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EligibilityChart = ({ data }) => {
  // Filter eligibility data
  const eligibilityCounts = {
    "Clean Alternative Fuel Vehicle Eligible": 0,
    "Eligibility unknown as battery range has not been researched": 0,
    "Not eligible due to low battery range": 0,
  };

  data.forEach((vehicle) => {
    const eligibilityStatus = vehicle["Clean Alternative Fuel Vehicle (CAFV) Eligibility"];
    if (eligibilityCounts[eligibilityStatus] !== undefined) {
      eligibilityCounts[eligibilityStatus]++;
    }
  });

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(eligibilityCounts),
    datasets: [
      {
        label: 'Eligibility Count',
        data: Object.values(eligibilityCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="eligibility-chart">
      <h3>CAFV Eligibility Status</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default EligibilityChart;
