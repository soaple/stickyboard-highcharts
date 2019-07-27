// src/components/highcharts/SBH_TreeMap.js

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import ReactResizeDetector from 'react-resize-detector';

import Highcharts from 'highcharts';
import HighchartsTreeMap from 'highcharts/modules/treemap';
HighchartsTreeMap(Highcharts);

import UUIDv1 from 'uuid/v1';
import Moment from 'moment-timezone';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
});

class SBH_TreeMap extends React.Component {
    constructor (props) {
        super(props);

        this.chart = {};

        this.state = {
            chartId: UUIDv1()
        }
    }

    componentDidMount () {
        this.chart = Highcharts.chart(this.state.chartId, {

            title: {
                text: this.props.title
            },

            // series: [
            //     {
            //         tyep: 'treemap',
            //         layoutAlgorithm: 'squarified',
            //         // name: this.props.yAxisDataKey,
            //         data: this.props.data,
            //     }
            // ],

            series: [{
                type: 'treemap',
                layoutAlgorithm: 'squarified',
                data: [{
                    name: 'A',
                    value: 6,
                    colorValue: 1
                }, {
                    name: 'B',
                    value: 6,
                    colorValue: 2
                }, {
                    name: 'C',
                    value: 4,
                    colorValue: 3
                }, {
                    name: 'D',
                    value: 3,
                    colorValue: 4
                }, {
                    name: 'E',
                    value: 2,
                    colorValue: 5
                }, {
                    name: 'F',
                    value: 2,
                    colorValue: 6
                }, {
                    name: 'G',
                    value: 1,
                    colorValue: 7
                }]
            }],

            // responsive: {
            //     rules: [{
            //         condition: {
            //             maxWidth: 500
            //         },
            //         chartOptions: {
            //             legend: {
            //                 align: 'center',
            //                 verticalAlign: 'bottom',
            //                 layout: 'horizontal'
            //             },
            //             yAxis: {
            //                 labels: {
            //                     align: 'left',
            //                     x: 0,
            //                     y: -5
            //                 },
            //                 title: {
            //                     text: null
            //                 }
            //             },
            //             subtitle: {
            //                 text: null
            //             },
            //             credits: {
            //                 enabled: false
            //             }
            //         }
            //     }]
            // },

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

SBH_TreeMap.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SBH_TreeMap);
