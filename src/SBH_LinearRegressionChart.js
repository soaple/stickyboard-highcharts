// src/SBH_LinearRegressionChart.js
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ReactResizeDetector from "react-resize-detector";

import Highcharts from "highcharts";

import UUIDv1 from "uuid/v1";

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

class SBH_LinearRegressionChart extends React.Component {
  constructor(props) {
    super(props);

    this.chart = {};

    this.state = {
      chartId: UUIDv1(),
    };
  }

  componentDidMount() {
    this.chart = Highcharts.chart(this.state.chartId, {
      title: {
        text: this.props.title,
      },

      xAxis: {
        title: {
          text: this.props.xAxisDataKey,
        },
      },

      yAxis: {
        title: {
          text: this.props.yAxisDataKey,
        },
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
        },
      },

      series: [
        {
          type: "line",
          name: this.props.yAxisDataKey,
          data: this.jsonArrayToLineData(this.props.lineData),
        },
        {
          type: "scatter",
          name: this.props.xAxisDataKey,
          data: this.jsonArrayToScatterData(this.props.scatterData),
          marker: {
            radius: 4,
          },
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                align: "center",
                verticalAlign: "bottom",
                layout: "horizontal",
              },
              yAxis: {
                labels: {
                  align: "left",
                  x: 0,
                  y: -5,
                },
                title: {
                  text: null,
                },
              },
              subtitle: {
                text: null,
              },
              credits: {
                enabled: false,
              },
            },
          },
        ],
      },

      credits: {
        enabled: false,
      },
    });
  }

  onResize = (width, height) => {
    this.chart.setSize(width, height, false);
  };

  jsonArrayToLineData = (jsonArray) => {
    var regressionlineData = [];
    jsonArray.map((jsonObject) => {
      regressionlineData.push([jsonObject.xValue, jsonObject.yValue]);
    });
    // jsonArray has two json objects with xValue, yValue. (the two points of regression line)
    // The two points are the first and last points based on the x-axis of the regression line.

    return regressionlineData;
  };
  jsonArrayToScatterData = (jsonArray) => {
    var scatterData = [];
    jsonArray.map((jsonObject) => {
      // jsonArray is jsonArray having many json objects with xValue, yValue.
      // data of jsonArray is raw data.
      scatterData.push([jsonObject.xValue, jsonObject.yValue]);
    });
    return scatterData;
  };

  render() {
    const { chartId } = this.state;

    return (
      <Root id={chartId}>
        <ReactResizeDetector
          resizableElementId={chartId}
          handleWidth
          handleHeight
          onResize={this.onResize}
        />
      </Root>
    );
  }
}

SBH_LinearRegressionChart.propTypes = {
  title: PropTypes.string,
  scatterData: PropTypes.object.isRequired,
  lineData: PropTypes.object.isRequired,
  xAxisDataKey: PropTypes.string.isRequired,
  yAxisDataKey: PropTypes.string.isRequired,
};

export default SBH_LinearRegressionChart;
