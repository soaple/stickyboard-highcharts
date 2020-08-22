// src/SBH_PolynomialRegressionChart.js

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

class SBH_PolynomialRegressionChart extends React.Component {
    constructor(props) {
        super(props);

        this.chart = {};

        this.state = {
            chartId: UUIDv1(),
        };
    }

    componentDidMount() {
        const {
            title,
            subtitle,
            rawData,
            lineData,
            xAxisDataKey,
            yAxisDataKey,
        } = this.props;
        this.chart = Highcharts.chart(this.state.chartId, {
            chart: {
                type: 'spline',
            },
            title: {
                text: title,
            },
            subtitle: {
                text: subtitle,
            },
            yAxis: {
                title: {
                    text: yAxisDataKey,
                },
            },
            xAxis: {
                title: {
                    text: xAxisDataKey,
                },
            },
            tooltip: {
                shared: true,
                valueDecimals: 2,
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false,
                    },
                    marker: {
                        enabled: false,
                    },
                },
            },

            series: [
                {
                    name: 'Polynomial regression',
                    // color: '#FF0000',
                    data: this.jsonArrayToLineData(lineData),
                },
                {
                    name: 'Raw data',
                    // color: '#808080',
                    data: this.jsonArrayToRawData(rawData),
                },
            ],
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
        return lineData;
    };

    jsonArrayToRawData = (jsonArray) => {
        var rawData = [];
        jsonArray.map((jsonObject) => {
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

SBH_PolynomialRegressionChart.propTypes = {
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

export default SBH_PolynomialRegressionChart;
