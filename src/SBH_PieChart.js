// src/components/highcharts/SBH_PieChart.js

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import ReactResizeDetector from 'react-resize-detector';

import Highcharts from 'highcharts';

import UUIDv1 from 'uuid/v1';
import Moment from 'moment-timezone';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
});

class SBH_PieChart extends React.Component {
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
                type: 'pie',
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                style: {
                    fontFamily: '',
                },
            },

            title: {
                text: this.props.title
            },

            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },

            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    colors: this.props.colorArray,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}<br /><b>{point.percentage:.1f}%</b>',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    },
                }
            },

            series: [
                {
                    name: this.props.valueKey,
                    data: this.jsonArrayToSeriesData(this.props.valueKey, this.props.data),
                }
            ],

            credits: {
                enabled: false
            },
        });
    }

    onResize = (width, height) => {
        console.log('onResize', width, height);
        this.chart.setSize(width, height, false);
        // this.chart.setSize(
        //     $('#' + this.state.chartId).width(),
        //     $('#' + this.state.chartId).height(),
        //     false);
    }

    jsonArrayToSeriesData = (valueKey, jsonArray, formatter) => {
        var seriesData = [];

        jsonArray.map((jsonObject) => {
            // console.log(jsonObject);

            if (formatter && typeof(formatter) === 'function') {
                seriesData.push(formatter(jsonObject[valueKey]));
            } else {
                let data = {
                    name: jsonObject['name'],
                    y: jsonObject[valueKey],
                }
                seriesData.push(data);
            }
        });

        // console.log(seriesData);
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

SBH_PieChart.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SBH_PieChart);
