// src/components/highcharts/SBH_GaugeChart.js

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
    textAlign: center;
    position: absolute;
    top: 3%;
    left: 50%;
    transform: translate(-50%, -50%);
    fontWeight: 600;
    ${props => props.color && `
        color: ${props.color};
    `}
`;

const IconTextfit = styled(Textfit)`
    width: 35%;
    height: 35%;
    textAlign: center;
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${props => props.color && `
        color: ${props.color};
    `}
`;

const ValueTextfit = styled(Textfit)`
    width: 30%;
    height: 20%;
    textAlign: center;
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${props => props.color && `
        color: ${props.color};
    `}
`;

const Value = styled.span`
    fontWeight: 800;
`;

const Unit = styled.span`
    fontSize: 0.7em;
    fontWeight: 500;
`;

class SBH_GaugeChart extends React.Component {
    constructor (props) {
        super(props);

        this.chart = {};

        this.state = {
            chartId: UUIDv1()
        }
    }

    componentDidMount () {
        this.chart = Highcharts.chart(this.state.chartId, {
            chart: {
                type: 'solidgauge',
                backgroundColor: 'rgba(255, 255, 255, 0.0)',
                style: {
                    fontFamily: '',
                },
                alignTicks: false,
            },

            title: false,
            // title: {
            //     visible: false,
            //     text: this.props.title,
            //     useHTML: true,
            //     style: {
            //         fontSize: '20px',
            //         fontWeight: 600,
            //         color: this.props.baseColor,
            //     }
            // },

            pane: {
                center: ['50%', '50%'],
                size: '80%',
                startAngle: -120,
                endAngle: 120,
                background: {
                    backgroundColor: this.props.baseColor,
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },

            tooltip: {
                enabled: false
            },

            // the value axis
            yAxis: {
                min: this.props.min,
                max: this.props.max,
                tickPositioner: () => {
                    return [this.props.min, this.props.max];
                },
                stops: [
                    [0.1, this.props.fillColors[0]],
                    [0.5, this.props.fillColors[1]],
                    [0.9, this.props.fillColors[2]]
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                title: {
                    y: -70
                },
                labels: {
                    y: 24,
                    style: {
                        fontSize: '16px',
                        fontWeight: 600,
                        color: this.props.baseColor,
                    },
                }
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            },

            series: [{
                name: '',
                data: [parseFloat(this.props.value.toFixed(this.props.precision))],
                // https://api.highcharts.com/highcharts/plotOptions.series.dataLabels
                dataLabels: {
                    enabled: false,
                    useHTML: true,
                    style: {
                        textAlign: 'center',
                        fontSize: '20px',
                        fontWeight: 600,
                        color: this.props.baseColor,
                    },
                    verticalAlign: 'bottom',
                    format: '{y}<br/>' + this.props.unit,
                    // formatter: () => {
                    //     return Highcharts.numberFormat(this.y, 2);
                    // },
                },
                tooltip: {
                    valueSuffix: ' ' + this.props.unit,
                },
            }],

            credits: {
                enabled: false
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

    onResize = () => {
        this.chart.setSize(
            $('#' + this.state.chartId).width(),
            $('#' + this.state.chartId).height(),
            false);
    }

    jsonArrayToSeriesData = (name, jsonArray, formatter) => {
        var seriesData = [];

        jsonArray.map((jsonObject) => {
            // console.log(jsonObject);

            if (formatter && typeof(formatter) === 'function') {
                seriesData.push(formatter(jsonObject[name]));
            } else {
                seriesData.push(jsonObject[name]);
            }
        });

        return seriesData;
    }

    render() {
        const { chartId } = this.state;

        return (
            <Root>
                {/* Chart */}
                <ChartContainer
                    id={chartId}>
                    <ReactResizeDetector
                        resizableElementId={chartId}
                        handleWidth
                        handleHeight
                        onResize={this.onResize} />
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

                {/* Icon */}
                <IconTextfit
                    mode="single"
                    min={20}
                    max={200}
                    forceSingleModeWidth={false}
                    color={this.props.baseColor}>
                    {this.props.icon}
                </IconTextfit>

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
                    <Unit>
                        {this.props.unit}
                    </Unit>
                </ValueTextfit>
            </Root>
        )
    }
}

SBH_GaugeChart.propTypes = {};

export default SBH_GaugeChart;
