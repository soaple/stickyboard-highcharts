// src/components/highcharts/SBH_GaugeSeriesChart.js

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import ReactResizeDetector from 'react-resize-detector';

import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

import UUIDv1 from 'uuid/v1';

import { Textfit } from 'react-textfit';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
    chartContainer: {
        width: '100%',
        height: '100%',
    },
    title: {
        width: '100%',
        height: '10%',
        textAlign: 'center',
        position: 'absolute',
        top: '3%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontWeight: 600,
    },
    icon: {
        width: '35%',
        height: '35%',
        textAlign: 'center',
        position: 'absolute',
        top: '55%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    valueContainer: {
        width: '30%',
        height: '20%',
        textAlign: 'center',
        position: 'absolute',
        top: '90%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    value: {
        fontWeight: 800,
    },
    unit: {
        fontSize: '0.7em',
        fontWeight: 500,
    }
});

class SBH_GaugeSeriesChart extends React.Component {
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
                background: [{
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#FFF'],
                            [1, '#333']
                        ]
                    },
                    borderWidth: 0,
                    outerRadius: '109%'
                }, {
                    backgroundColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, '#333'],
                            [1, '#FFF']
                        ]
                    },
                    borderWidth: 1,
                    outerRadius: '107%'
                }, {
                    // default background
                }, {
                    backgroundColor: this.props.baseColor,
                    borderWidth: 0,
                    outerRadius: '105%',
                    innerRadius: '103%'
                }]
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
                    rotation: 'auto'
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
                plotBands: [{
                    from: 0,
                    to: this.props.max * 0.6,
                    color: '#55BF3B' // green
                }, {
                    from: this.props.max * 0.6,
                    to: this.props.max * 0.8,
                    color: '#DDDF0D' // yellow
                }, {
                    from: this.props.max * 0.8,
                    to: this.props.max,
                    color: '#DF5353' // red
                }]
            },

            series: [{
                name: this.props.title,
                data: [parseFloat(this.props.value.toFixed(this.props.precision))],
                dataLabels: false,
                // tooltip: {
                //     valueSuffix: ' ' + this.props.unit
                // }
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

    render () {
        const { chartId } = this.state;
        const { classes, theme } = this.props

        return (
            <div className={classes.root}>
                {/* Chart */}
                <div
                    id={chartId}
                    className={classes.chartContainer}>
                    <ReactResizeDetector
                        resizableElementId={chartId}
                        handleWidth
                        handleHeight
                        onResize={this.onResize} />
                </div>

                {/* Title */}
                <Textfit
                    mode="single"
                    min={20}
                    max={200}
                    forceSingleModeWidth={false}
                    className={classes.title}
                    style={{color: this.props.baseColor}}>
                    {this.props.title}
                </Textfit>

                {/* Value */}
                <Textfit
                    mode="single"
                    min={20}
                    max={200}
                    forceSingleModeWidth={false}
                    className={classes.valueContainer}
                    style={{color: this.props.baseColor}}>
                    <span className={classes.value}>
                        {this.props.value.toFixed(this.props.precision) + ' '}
                    </span>
                    <span className={classes.unit}>
                        {this.props.unit}
                    </span>
                </Textfit>
            </div>
        )
    }
}

SBH_GaugeSeriesChart.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SBH_GaugeSeriesChart);
