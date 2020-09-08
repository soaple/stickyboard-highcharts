// src/SBH_GanttChart.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactResizeDetector from 'react-resize-detector';
import Highcharts from 'highcharts';
import UUIDv1 from 'uuid/v1';
require('highcharts/modules/gantt.js')(Highcharts);

const Root = styled.div`
    width: 100%;
    height: 100%;
`;

class SBH_GanttChart extends React.Component {
    constructor(props) {
        super(props);

        this.chart = {};

        this.state = {
            chartId: UUIDv1(),
        };
    }

    componentDidMount() {
        const { chartId } = this.state;
        const { title, data } = this.props;

        this.chart = Highcharts.ganttChart(chartId, {
            chart: {
                height: '100%',
            },
            title: {
                text: title,
            },

            series: [
                {
                    data: data,
                },
            ],
        });
    }

    onResize = (width, height) => {
        this.chart.setSize(width, height, true);
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

SBH_GanttChart.propTypes = {
    title: PropTypes.string,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string || PropTypes.number,
            name: PropTypes.string,
            start: PropTypes.number,
            end: PropTypes.number,
            // dependency: PropTypes.string || PropTypes.array,
        })
    ).isRequired,
};

export default SBH_GanttChart;
