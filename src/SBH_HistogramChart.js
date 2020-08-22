// src/SBH_HistogramChart.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactResizeDetector from 'react-resize-detector';
import Highcharts from 'highcharts';
import UUIDv1 from 'uuid/v1';
require('highcharts/modules/histogram-bellcurve.js')(Highcharts);
const Root = styled.div`
    width: 100%;
    height: 100%;
`;

class SBH_HistogramChart extends React.Component {
    constructor(props) {
        super(props);

        this.chart = {};

        this.state = {
            chartId: UUIDv1(),
        };
    }

    componentDidMount() {
        const {
            title,
            subTitle,
            histogramData,
            dataName,
            yAxisDataKey,
        } = this.props;
        this.chart = Highcharts.chart(this.state.chartId, {
            chart: {
                type: 'column',
            },
            title: {
                text: title,
            },
            subtitle: {
                text: subTitle,
            },

            xAxis: {
                categories: this.jsonArrayToCategories(histogramData),
                crosshair: true,
            },

            yAxis: {
                min: 0,
                title: {
                    text: yAxisDataKey,
                },
            },

            plotOptions: {
                column: {
                    pointPadding: 0,
                    borderWidth: 0,
                    groupPadding: 0,
                    shadow: false,
                },
            },

            series: [
                {
                    name: dataName,
                    data: this.jsonArrayToData(histogramData),
                },
            ],
        });
    }
    jsonArrayToCategories = (jsonArray) => {
        var categories = [];
        jsonArray.map((jsonObject) => {
            categories.push(jsonObject.xValue);
        });
        return categories;
    };

    jsonArrayToData = (jsonArray) => {
        var data = [];
        jsonArray.map((jsonObject) => {
            data.push(jsonObject.yValue);
        });
        return data;
    };

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

SBH_HistogramChart.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    histogramData: PropTypes.arrayOf(
        PropTypes.shape({
            xValue: PropTypes.string,
            yValue: PropTypes.number,
        })
    ).isRequired,
    yAxisDataKey: PropTypes.string.isRequired,
};

export default SBH_HistogramChart;
