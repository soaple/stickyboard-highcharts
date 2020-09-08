// src/SBH_LinearRegressionChart.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactResizeDetector from 'react-resize-detector';
import Highcharts from 'highcharts';
import UUIDv1 from 'uuid/v1';

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
        const { chartId } = this.state;
        const {
            title,
            rawData,
            lineData,
            xAxisDataKey,
            yAxisDataKey,
        } = this.props;

        this.chart = Highcharts.chart(chartId, {
            title: {
                text: title,
            },

            xAxis: {
                title: {
                    text: xAxisDataKey,
                },
            },

            yAxis: {
                title: {
                    text: yAxisDataKey,
                },
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false,
                    },
                },
            },

            series: this.props.series,

            series: [
                {
                    type: 'line',
                    name: 'Linear regression',
                    data: this.jsonArrayToLineData(lineData),
                },
                {
                    type: 'scatter',
                    name: 'Raw data',
                    data: this.jsonArrayToRawData(rawData),
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
                                align: 'center',
                                verticalAlign: 'bottom',
                                layout: 'horizontal',
                            },
                            yAxis: {
                                labels: {
                                    align: 'left',
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
        var lineData = [];
        jsonArray.map((jsonObject) => {
            lineData.push([jsonObject.xValue, jsonObject.yValue]);
        });
        // jsonArray has two json objects with xValue, yValue. (the two points of regression line)
        // The two points are the first and last points based on the x-axis of the regression line.

        return lineData;
    };

    jsonArrayToRawData = (jsonArray) => {
        var rawData = [];
        jsonArray.map((jsonObject) => {
            // jsonArray is jsonArray having many json objects with xValue, yValue.
            // data of jsonArray is raw data.
            rawData.push([jsonObject.xValue, jsonObject.yValue]);
        });

        return rawData;
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
    subtitle: PropTypes.string,
    rawData: PropTypes.arrayOf(
        PropTypes.shape({
            xValue: PropTypes.number,
            yValue: PropTypes.number,
        })
    ).isRequired,
    lineData: PropTypes.arrayOf(
        PropTypes.shape({
            xValue: PropTypes.number,
            yValue: PropTypes.number,
        })
    ).isRequired,
    xAxisDataKey: PropTypes.string.isRequired,
    yAxisDataKey: PropTypes.string.isRequired,
};

export default SBH_LinearRegressionChart;
