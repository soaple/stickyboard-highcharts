// src/components/highcharts/SBH_SpiderWeb.js

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

class SBH_SpiderWeb extends React.Component {
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
                type: 'line',
            },

            title: {
                text: this.props.title,
            },

            pane: {
                size: '80%'
            },

            xAxis: {
                categories: ['Sales', 'Marketing', 'Development', 'Customer Support',
                'Information Technology', 'Administration'],
                tickmarkPlacement: 'on',
                lineWidth: 0
            },

            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },

            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
            },

            legend: {
                align: 'center',
                verticalAlign: 'bottom',
                y: 0,
                layout: 'vertical'
            },

            series: [{
                name: 'Allocated Budget',
                data: [43000, 19000, 60000, 35000, 17000, 10000],
                pointPlacement: 'on'
            }, {
                name: 'Actual Spending',
                data: [50000, 39000, 42000, 31000, 26000, 14000],
                pointPlacement: 'on'
            }],

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

SBH_SpiderWeb.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SBH_SpiderWeb);
