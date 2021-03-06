// src/components/highcharts/SBH_TreeMap.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ReactResizeDetector from 'react-resize-detector';

import Highcharts from 'highcharts';
import HighchartsTreeMap from 'highcharts/modules/treemap';
HighchartsTreeMap(Highcharts);

import UUIDv1 from 'uuid/v1';
import Moment from 'moment-timezone';

const Root = styled.div`
    width: 100%;
    height: 100%;
`;

class SBH_TreeMap extends React.Component {
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
            title: {
                text: this.props.title,
            },

            // series: [
            //     {
            //         tyep: 'treemap',
            //         layoutAlgorithm: 'squarified',
            //         // name: this.props.yAxisDataKey,
            //         data: this.props.data,
            //     }
            // ],

            series: [
                {
                    type: 'treemap',
                    layoutAlgorithm: 'squarified',
                    data: [
                        {
                            name: 'A',
                            value: 6,
                            colorValue: 1,
                        },
                        {
                            name: 'B',
                            value: 6,
                            colorValue: 2,
                        },
                        {
                            name: 'C',
                            value: 4,
                            colorValue: 3,
                        },
                        {
                            name: 'D',
                            value: 3,
                            colorValue: 4,
                        },
                        {
                            name: 'E',
                            value: 2,
                            colorValue: 5,
                        },
                        {
                            name: 'F',
                            value: 2,
                            colorValue: 6,
                        },
                        {
                            name: 'G',
                            value: 1,
                            colorValue: 7,
                        },
                    ],
                },
            ],

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
                enabled: false,
            },
        });
    }

    onResize = (width, height) => {
        this.chart.setSize(width, height, false);
    };

    jsonArrayToSeriesData = (name, jsonArray, formatter) => {
        var seriesData = [];
        jsonArray.map((jsonObject) => {
            // console.log(jsonObject);

            if (formatter && typeof formatter === 'function') {
                seriesData.push(formatter(jsonObject[name]));
            } else {
                seriesData.push(jsonObject[name]);
            }
        });

        return seriesData;
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

SBH_TreeMap.propTypes = {};

export default SBH_TreeMap;
