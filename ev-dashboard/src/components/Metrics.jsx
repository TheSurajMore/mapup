const Metrics = ({ summaryData }) => {
  return (
    <div className="metrics">
      <div>Total Vehicles: {summaryData.totalVehicles}</div>
      <div>Total EVs: {summaryData.evs}</div>
      <div>Total PHEVs: {summaryData.phevs}</div>
    </div>
  );
};

export default Metrics;
