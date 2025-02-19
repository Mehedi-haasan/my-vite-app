import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const { CanvasJSChart } = CanvasJSReact;

const Charts4 = () => {
  const options = {
    theme: "dark2",
    exportFileName: "Doughnut Chart",
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Monthly Expense",
    },
    legend: {
      cursor: "pointer",
      itemclick: explodePie, // Explodes the pie slice on legend click
    },
    data: [
      {
        type: "doughnut",
        innerRadius: 90, // Creates the doughnut shape by setting an inner radius
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)", // Tooltip content
        indexLabel: "{name} - #percent%", // Label format for each segment
        dataPoints: [
          { y: 450, name: "Rent" },
          { y: 120, name: "Insurance" },
          { y: 300, name: "Travelling" },
          { y: 800, name: "Staff Cost" },
          { y: 150, name: "Electricity Bill" },
          { y: 150, name: "Shopping" },
          { y: 250, name: "Others" },
        ],
      },
    ],
  };

  // Function to toggle the exploded state of the clicked pie slice
  function explodePie(e) {
    const dataPoint = e.dataSeries.dataPoints[e.dataPointIndex];
    dataPoint.exploded = !dataPoint.exploded; // Toggle exploded state
    e.chart.render(); // Re-render the chart to reflect the changes
  }

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Charts4;
