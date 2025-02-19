import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const { CanvasJSChart } = CanvasJSReact;

const Charts7 = ({ month }) => {
  console.log(month); // Debugging the passed data

  // Ensure 'month' data is available; use an empty array as fallback if not
  const chartData = month || [];

  // Chart options configuration
  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Monthly Sales Data",
    },
    axisX: {
      valueFormatString: "DD MMM", // Display day and month
    },
    axisY: {
      prefix: "Tk", // Currency prefix
      labelFormatter: addSymbols,
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },
    data: [
      {
        type: "column",
        name: "Actual Sales",
        showInLegend: false,
        xValueFormatString: "DD MMM YYYY",
        yValueFormatString: "Tk#,##0",
        dataPoints: chartData,
      },
      {
        type: "line",
        name: "Expected Sales",
        showInLegend: false,
        yValueFormatString: "Tk#,##0",
        dataPoints: chartData,
      },
      {
        type: "area",
        name: "Profit",
        markerBorderColor: "white",
        markerBorderThickness: 2,
        showInLegend: false,
        yValueFormatString: "Tk#,##0",
        dataPoints: chartData,
      },
    ],
  };

  // Format numbers with suffixes like K, M, B
  function addSymbols(e) {
    const suffixes = ["", "K", "M", "B"];
    const order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
    const suffix = suffixes[Math.min(order, suffixes.length - 1)];
    return CanvasJSReact.CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
  }

  // Toggle visibility of data series in the legend
  function toggleDataSeries(e) {
    e.dataSeries.visible = e.dataSeries.visible === undefined || e.dataSeries.visible;
    e.chart.render();
  }

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Charts7;
