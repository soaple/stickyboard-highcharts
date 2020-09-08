// src/components/highcharts/SBH_Highcharts.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ReactResizeDetector from 'react-resize-detector';

import Highcharts from 'highcharts';

import UUIDv1 from 'uuid/v1';
import Moment from 'moment-timezone';

const Root = styled.div`
    width: 100%;
    height: 100%;
`;

class SBH_Highcharts extends React.Component {
    constructor(props) {
        super(props);

        this.chart = {};

        this.state = {
            chartId: UUIDv1(),
        };
    }

    componentDidMount() {
        const { chartId } = this.state;

        this.chart = Highcharts.chart(chartId, {
            chart: {
                type: this.props.chartType,
            },

            title: {
                text: this.props.title,
            },

            xAxis: {
                categories: this.jsonArrayToSeriesData(
                    this.props.xAxisDataKey,
                    this.props.data,
                    (value) => {
                        return Moment(new Date(value)).format('YY-MM-DD');
                    }
                ),
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
                    name: this.props.yAxisDataKey,
                    data: this.jsonArrayToSeriesData(
                        this.props.yAxisDataKey,
                        this.props.data
                    ),
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

SBH_Highcharts.propTypes = {};

export default SBH_Highcharts;
