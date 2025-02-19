import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";

const { CanvasJSChart } = CanvasJSReact;

const Charts3 = ({ hourSales }) => {
  const options = {
    animationEnabled: true,
    title: {
      text: "Daily Sales Data",
    },
    axisX: {
      valueFormatString: "hh TT", // Format time on the X-axis
      interval: 1,
      intervalType: "hour",
    },
    axisY: {
      valueFormatString: "#,##0",
      prefix: "Tk ", // Currency prefix
    },
    data: [
      {
        type: "splineArea", // Use spline area chart
        color: "rgba(54,158,173,.7)", // Area color
        markerSize: 5,
        xValueFormatString: "hh TT",
        yValueFormatString: "$#,##0", // Format sales value
        dataPoints: hourSales || [], // Default to empty array if no data is passed
      },
    ],
  };

  return (
    <div className="rounded">
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Charts3;
