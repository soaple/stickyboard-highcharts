// src/components/highcharts/SBH_SunBurst.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ReactResizeDetector from 'react-resize-detector';

import Highcharts from 'highcharts';
import HighchartsSunBurst from 'highcharts/modules/sunburst';
HighchartsSunBurst(Highcharts);

import UUIDv1 from 'uuid/v1';
import Moment from 'moment-timezone';

const Root = styled.div`
    width: 100%;
    height: 100%;
`;

class SBH_SunBurst extends React.Component {
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
                height: '100%',
            },

            title: {
                text: this.props.title,
            },

            // subtitle: {
            //     text: 'Subtitle'
            // },

            series: [
                {
                    type: 'sunburst',
                    data: this.props.data,
                    allowDrillToNode: true,
                    cursor: 'pointer',
                    dataLabels: {
                        format: '{point.name}',
                        filter: {
                            property: 'innerArcLength',
                            operator: '>',
                            value: 16,
                        },
                    },
                    levels: [
                        {
                            level: 1,
                            levelIsConstant: false,
                            dataLabels: {
                                filter: {
                                    property: 'outerArcLength',
                                    operator: '>',
                                    value: 64,
                                },
                            },
                        },
                        {
                            level: 2,
                            colorByPoint: true,
                        },
                        {
                            level: 3,
                            colorVariation: {
                                key: 'brightness',
                                to: -0.5,
                            },
                        },
                        {
                            level: 4,
                            colorVariation: {
                                key: 'brightness',
                                to: 0.5,
                            },
                        },
                    ],
                },
            ],

            tooltip: {
                headerFormat: '',
                pointFormat: '<b>{point.name}</b>: <b>{point.value}</b>',
            },

            credits: {
                enabled: false,
            },
        });
    }

    onResize = (width, height) => {
        this.chart.setSize(width, height, false);
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

SBH_SunBurst.propTypes = {};

export default SBH_SunBurst;
