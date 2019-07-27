// src/components/highcharts/SBH_SunBurst.js

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import ReactResizeDetector from 'react-resize-detector';

import Highcharts from 'highcharts';
import HighchartsSunBurst from 'highcharts/modules/sunburst';
HighchartsSunBurst(Highcharts);

import UUIDv1 from 'uuid/v1';
import Moment from 'moment-timezone';

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
    },
});

class SBH_SunBurst extends React.Component {
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
                height: '100%'
            },

            title: {
                text: this.props.title
            },

            // subtitle: {
            //     text: 'Subtitle'
            // },

            series: [{
                type: "sunburst",
                data: this.props.data,
                allowDrillToNode: true,
                cursor: 'pointer',
                dataLabels: {
                    format: '{point.name}',
                    filter: {
                        property: 'innerArcLength',
                        operator: '>',
                        value: 16
                    }
                },
                levels: [{
                    level: 1,
                    levelIsConstant: false,
                    dataLabels: {
                        filter: {
                            property: 'outerArcLength',
                            operator: '>',
                            value: 64
                        }
                    }
                }, {
                    level: 2,
                    colorByPoint: true
                },
                {
                    level: 3,
                    colorVariation: {
                        key: 'brightness',
                        to: -0.5
                    }
                }, {
                    level: 4,
                    colorVariation: {
                        key: 'brightness',
                        to: 0.5
                    }
                }]

            }],

            tooltip: {
                headerFormat: "",
                pointFormat: '<b>{point.name}</b>: <b>{point.value}</b>'
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

SBH_SunBurst.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SBH_SunBurst);
