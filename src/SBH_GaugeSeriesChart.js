// src/components/highcharts/SBH_GaugeSeriesChart.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ReactResizeDetector from 'react-resize-detector';

import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

import UUIDv1 from 'uuid/v1';

import { Textfit } from 'react-textfit';

const Root = styled.div`
    width: 100%;
    height: 100%;
`;

const ChartContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const TitleTextfit = styled(Textfit)`
    width: 100%;
    height: 10%;
    textalign: center;
    position: absolute;
    top: 3%;
    left: 50%;
    transform: translate(-50%, -50%);
    fontweight: 600;
    ${(props) =>
        props.color &&
        `
        color: ${props.color};
    `}
`;

const ValueTextfit = styled(Textfit)`
    width: 30%;
    height: 20%;
    textalign: center;
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${(props) =>
        props.color &&
        `
        color: ${props.color};
    `}
`;

const Value = styled.span`
    fontweight: 800;
`;

const Unit = styled.span`
    fontsize: 0.7em;
    fontweight: 500;
`;

class SBH_GaugeSeriesChart extends React.Component {
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
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false,
                backgroundColor: 'rgba(255, 255, 255, 0.0)',
                style: {
                    fontFamily: '',
                },
                alignTicks: false,
            },

            title: false,
            // title: {
            //     text: this.props.title,
            //     useHTML: true,
            //     style: {
            //         fontSize: '18px',
            //         fontWeight: 600,
            //         color: this.props.baseColor,
            //     }
            // },

            pane: {
                center: ['50%', '45%'],
                size: '70%',
                startAngle: -150,
                endAngle: 150,
                background: [
                    {
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                                [0, '#FFF'],
                                [1, '#333'],
                            ],
                        },
                        borderWidth: 0,
                        outerRadius: '109%',
                    },
                    {
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                                [0, '#333'],
                                [1, '#FFF'],
                            ],
                        },
                        borderWidth: 1,
                        outerRadius: '107%',
                    },
                    {
                        // default background
                    },
                    {
                        backgroundColor: this.props.baseColor,
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%',
                    },
                ],
            },

            yAxis: {
                min: this.props.min,
                max: this.props.max,
                // tickPositioner: () => {
                //     return [this.props.min, this.props.max];
                // },

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#666',

                tickPixelInterval: 30,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#666',
                labels: {
                    step: 2,
                    rotation: 'auto',
                },
                // title: {
                //     text: this.props.unit,
                //     style: {
                //         fontSize: '20px',
                //         fontWeight: 500,
                //         color: this.props.baseColor,
                //         top: '40%',
                //     }
                // },
                plotBands: [
                    {
                        from: 0,
                        to: this.props.max * 0.6,
                        color: '#55BF3B', // green
                    },
                    {
                        from: this.props.max * 0.6,
                        to: this.props.max * 0.8,
                        color: '#DDDF0D', // yellow
                    },
                    {
                        from: this.props.max * 0.8,
                        to: this.props.max,
                        color: '#DF5353', // red
                    },
                ],
            },

            series: [
                {
                    name: this.props.title,
                    data: [
                        parseFloat(
                            this.props.value.toFixed(this.props.precision)
                        ),
                    ],
                    dataLabels: false,
                    // tooltip: {
                    //     valueSuffix: ' ' + this.props.unit
                    // }
                },
            ],

            credits: {
                enabled: false,
            },
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value && this.chart) {
            let point = this.chart.series[0].points[0];

            let precision = nextProps.precision;
            let newValue = nextProps.value.toFixed(precision);
            point.update(parseFloat(newValue));
        }
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
            <Root>
                {/* Chart */}
                <ChartContainer id={chartId}>
                    <ReactResizeDetector
                        resizableElementId={chartId}
                        handleWidth
                        handleHeight
                        onResize={this.onResize}
                    />
                </ChartContainer>

                {/* Title */}
                <TitleTextfit
                    mode="single"
                    min={20}
                    max={200}
                    forceSingleModeWidth={false}
                    color={this.props.baseColor}>
                    {this.props.title}
                </TitleTextfit>

                {/* Value */}
                <ValueTextfit
                    mode="single"
                    min={20}
                    max={200}
                    forceSingleModeWidth={false}
                    color={this.props.baseColor}>
                    <Value>
                        {this.props.value.toFixed(this.props.precision) + ' '}
                    </Value>
                    <Unit>{this.props.unit}</Unit>
                </ValueTextfit>
            </Root>
        );
    }
}

SBH_GaugeSeriesChart.propTypes = {};

export default SBH_GaugeSeriesChart;
