import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; // Import PapaParse here
import Metrics from './components/Metrics';
import EVsByYear from './components/EVsByYear';
// import EVMap from './components/EVMap';
import EligibilityChart from './components/EligibilityChart';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [summaryData, setSummaryData] = useState({ totalVehicles: 0, evs: 0, phevs: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(1000); // Adjust the number of records per page
  const [isLoading, setIsLoading] = useState(true);

  // Load data and calculate summary first
  useEffect(() => {
    const loadData = async () => {
      const response = await fetch('/Electric_Vehicle_Population_Data.csv');
      const csvData = await response.text();
      Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const loadedData = results.data;
          setData(loadedData);

          // Calculate summary data (Total Vehicles, EVs, PHEVs)
          const totalVehicles = loadedData.length;
          const evs = loadedData.filter((d) => d["Electric Vehicle Type"] === "Battery Electric Vehicle (BEV)").length;
          const phevs = loadedData.filter((d) => d["Electric Vehicle Type"] === "Plug-in Hybrid Electric Vehicle (PHEV)").length;

          setSummaryData({ totalVehicles, evs, phevs });
          setIsLoading(false);
        },
      });
    };
    loadData();
  }, []);

  // Calculate the data for the current page
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h1>EV Dashboard</h1>
      
      {/* Display Summary Data First */}
      <Metrics summaryData={summaryData} />

      {/* Lazy Load Detailed Data */}
      {isLoading ? (
        <div>Loading detailed data...</div>
      ) : (
        <>
          <EVsByYear data={currentData} />
          <div className="eligibility-chart-container">
  <EligibilityChart className="eligibility-chart" data={currentData} />
</div>
          
          {/* Pagination to load more detailed data */}
          <div className="pagination"> <h2>Pages 👇</h2>
            {Array.from({ length: Math.ceil(data.length / dataPerPage) }, (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
                {/* <EVMap data={currentData} /> */}
    </div>
  );
}

export default App;
