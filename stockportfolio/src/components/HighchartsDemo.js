import React from "react";
import ReactHighcharts from "react-highcharts";

const config = {
  chart: {
    type: "spline",
  },
  title: {
    text: "My chart",
  },
  series: [
    {
      data: [1, 2, 1, 4, 3],
    },
  ],
};

function Demo() {
  return (
    <div>
      <h1>React HighCharts</h1>
      <ReactHighcharts config={config}></ReactHighcharts>
    </div>
  );
}

export default Demo;
