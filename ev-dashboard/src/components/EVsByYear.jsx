import { useState, useEffect } from "react";

const EVsByYear = ({ data }) => {
  const [currentYearData, setCurrentYearData] = useState([]);

  useEffect(() => {
    // This logic could be optimized to filter and load data based on the user’s current view
    const evCountByYear = data.reduce((acc, curr) => {
      const year = curr['Model Year'];  // Ensure the column name is correct
      if (year) {
        acc[year] = (acc[year] || 0) + 1;
      }
      return acc;
    }, {});
    
    const years = Object.keys(evCountByYear);
    const counts = Object.values(evCountByYear);
    setCurrentYearData({ years, counts });
  }, [data]);

  return (
    <div>
      <h2>Electric Vehicles by Year</h2>
      {currentYearData.years ? (
        <ul>
          {currentYearData.years.map((year, index) => (
            <ol key={year}>
              {year}: {currentYearData.counts[index]}
            </ol>
          ))}
        </ul>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default EVsByYear;
