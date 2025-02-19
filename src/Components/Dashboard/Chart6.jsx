import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const { CanvasJSChart } = CanvasJSReact;

const Charts6 = () => {
  const options = {
    animationEnabled: true,
    title: {
      text: "Name of your shop Stock Price - 2025"
    },
    axisX: {
      valueFormatString: "MMM", // Format the X-axis to show months
    },
    axisY: {
      prefix: "Tk", // Currency prefix for the price axis
      lineThickness: 0, // Remove Y-axis line thickness
    },
    axisY2: {
      labelFormatter: addSymbols, // Format volume axis with suffixes (K, M, B)
    },
    toolTip: {
      shared: true, // Show all data series values when hovering over a point
    },
    legend: {
      cursor: "pointer", // Change the cursor on legend items
      itemclick: toggleDataSeries, // Toggle the visibility of the data series on click
    },
    data: [
      {
        type: "ohlc", // OHLC chart for stock prices
        xValueFormatString: "MMMM 2025", // Format the X-axis labels as full month names and year
        name: "Stock Price",
        showInLegend: false, // Do not display in legend
        yValueFormatString: "$###0.00", // Price format for tooltips
        toolTipContent: "<b>{x}</b><br><span style='color:#4F81BC'>{name}</span>: <br>Open: {y[0]}<br>High: {y[1]}<br>Low: {y[2]}<br>Close: {y[3]}<br><b>Adj. Close</b>: {y[4]}", // Tooltips display stock data
        dataPoints: [
          { x: new Date(2025, 0), y: [214.00, 221.00, 200.47, 211.00, 202.46] },
          { x: new Date(2025, 1), y: [209.26, 220.14, 203.65, 215.79, 207.05] },
          { x: new Date(2025, 2), y: [216.59, 223.86, 210.90, 221.50, 214.14] },
          { x: new Date(2025, 3), y: [219.96, 234.59, 219.17, 232.38, 224.66] },
          { x: new Date(2025, 4), y: [232.74, 245.37, 231.37, 236.23, 228.38] },
          { x: new Date(2025, 5), y: [236.23, 248.72, 234.75, 248.17, 241.57] },
          { x: new Date(2025, 6), y: [248.17, 263.37, 247.88, 252.73, 246.01] },
          { x: new Date(2025, 7), y: [252.63, 266.93, 238.60, 242.97, 236.51] },
          { x: new Date(2025, 8), y: [243.13, 247.48, 235.28, 239.72, 234.93] },
          { x: new Date(2025, 9), y: [238.71, 252.00, 228.50, 246.38, 241.46] },
          { x: new Date(2025, 10), y: [247.19, 269.74, 236.21, 265.25, 259.95] },
          { x: new Date(2025, 11), y: [265.29, 269.90, 245.50, 249.94, 246.64] },
        ],
      },
      {
        type: "line", // Line chart for volume data
        axisYType: "secondary", // Use secondary Y-axis for volume
        markerSize: 6, // Marker size for line chart
        name: "Volume",
        showInLegend: false, // Do not display in legend
        dataPoints: [
          { x: new Date(2025, 0), y: 40421200 },
          { x: new Date(2025, 1), y: 32717100 },
          { x: new Date(2025, 2), y: 24930400 },
          { x: new Date(2025, 3), y: 21628500 },
          { x: new Date(2025, 4), y: 23070900 },
          { x: new Date(2025, 5), y: 28267100 },
          { x: new Date(2025, 6), y: 54446800 },
          { x: new Date(2025, 7), y: 146232200 },
          { x: new Date(2025, 8), y: 30222100 },
          { x: new Date(2025, 9), y: 28914900 },
          { x: new Date(2025, 10), y: 32666300 },
          { x: new Date(2025, 11), y: 34840600 },
        ],
      },
    ],
  };

  // Add symbols (K, M, B) for large numbers in volume axis
  function addSymbols(e) {
    const suffixes = ["", "K", "M", "B"];
    const order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
    const suffix = suffixes[Math.min(order, suffixes.length - 1)];
    return CanvasJSReact.CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }

  // Toggle the visibility of the data series when the user clicks on the legend
  function toggleDataSeries(e) {
    e.dataSeries.visible = !e.dataSeries.visible; // Toggle visibility of the clicked data series
    e.chart.render(); // Re-render the chart to reflect the change
  }

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Charts6;
