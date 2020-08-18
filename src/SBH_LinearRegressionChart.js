// src/SBH_LinearRegressionChart.js
import React from 'react';
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
                    type: 'line',
                    name: this.props.yAxisDataKey,
                    data: this.jsonArrayToLineData(this.props.data),
                },
                {
                    type: 'scatter',
                    name: this.props.xAxisDataKey,
                    data: this.jsonArrayToScatterData(this.props.data),
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

    jsonArrayToSeriesData = (name, jsonArray, formatter) => {
        var seriesData = [];

        jsonArray.map((jsonObject) => {
            // console.log(jsonObject);

            if (formatter && typeof formatter === 'function') {
                seriesData.push(formatter(jsonObject[name]));
            } else {
                seriesData.push(jsonObject[name]);
            }
        });

        return seriesData;
    };
    jsonArrayToLineData = (jsonArray) => {
        var regressionlineData = [];
        jsonArray[0].regressionlineData.map((jsonObject) => {
            regressionlineData.push([jsonObject.xValue, jsonObject.yValue]);
        });

        return regressionlineData;
    };
    jsonArrayToScatterData = (jsonArray) => {
        var scatterData = [];
        jsonArray[0].scatterData.map((jsonObject) => {
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

SBH_LinearRegressionChart.propTypes = {};

export default SBH_LinearRegressionChart;
