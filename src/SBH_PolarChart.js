// src/components/highcharts/SBH_PolarChart.js

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import ReactResizeDetector from 'react-resize-detector';

import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

import UUIDv1 from 'uuid/v1';
import Moment from 'moment-timezone';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
});

class SBH_PolarChart extends React.Component {
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
                polar: true,
            },

            title: {
                text: this.props.title
            },

            pane: {
                startAngle: 0,
                endAngle: 360
            },

            xAxis: {
                tickInterval: 45,
                min: 0,
                max: 360,
                labels: {
                    formatter: function () {
                        return this.value + '°';
                    }
                }
            },

            yAxis: {
                min: 0
            },

            plotOptions: {
                series: {
                    pointStart: 0,
                    pointInterval: 45
                },
                column: {
                    pointPadding: 0,
                    groupPadding: 0
                }
            },

            series: [
                {
                    type: this.props.seriesType,
                    name: this.props.yAxisDataKey,
                    data: this.jsonArrayToSeriesData(this.props.yAxisDataKey, this.props.data),
                }
            ],

            // series: [{
            //     type: 'column',
            //     name: 'Column',
            //     data: [8, 7, 6, 5, 4, 3, 2, 1],
            //     pointPlacement: 'between'
            // }, {
            //     type: 'line',
            //     name: 'Line',
            //     data: [1, 2, 3, 4, 5, 6, 7, 8]
            // }, {
            //     type: 'area',
            //     name: 'Area',
            //     data: [1, 8, 2, 7, 3, 6, 4, 5]
            // }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal'
                        },
                        yAxis: {
                            labels: {
                                align: 'left',
                                x: 0,
                                y: -5
                            },
                            title: {
                                text: null
                            }
                        },
                        subtitle: {
                            text: null
                        },
                        credits: {
                            enabled: false
                        }
                    }
                }]
            },

            credits: {
                enabled: false
            },
        });
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
            <div
                id={chartId}
                className={classes.root}>
                <ReactResizeDetector
                    resizableElementId={chartId}
                    handleWidth
                    handleHeight
                    onResize={this.onResize} />
            </div>
        )
    }
}

SBH_PolarChart.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SBH_PolarChart);
