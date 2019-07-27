// src/components/highcharts/SBH_GaugeChart.js

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
        top: '48%',
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

                {/* Icon */}
                <Textfit
                    mode="single"
                    min={20}
                    max={200}
                    forceSingleModeWidth={false}
                    className={classes.icon}
                    style={{color: this.props.baseColor}}>
                    {this.props.icon}
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

SBH_GaugeChart.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SBH_GaugeChart);
