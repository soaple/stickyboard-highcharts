// src/SBH_WordCloud.js

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactResizeDetector from 'react-resize-detector';
import Highcharts from 'highcharts';
import UUIDv1 from 'uuid/v1';
require('highcharts/modules/wordcloud.js')(Highcharts);

const Root = styled.div`
    width: 100%;
    height: 100%;
`;

class SBH_WordCloud extends React.Component {
    constructor(props) {
        super(props);

        this.chart = {};

        this.state = {
            chartId: UUIDv1(),
        };
    }

    textStringToJsonArray = (text) => {
        const lines = text.split(/[,\. ]+/g);
        const data = Highcharts.reduce(
            lines,
            function (arr, word) {
                var obj = Highcharts.find(arr, function (obj) {
                    return obj.name === word;
                });
                if (obj) {
                    obj.weight += 1;
                } else {
                    obj = {
                        name: word,
                        weight: 1,
                    };
                    arr.push(obj);
                }
                return arr;
            },
            []
        );
        return data;
    };

    componentDidMount() {
        const { title, text, name } = this.props;
        this.chart = Highcharts.chart(this.state.chartId, {
            series: [
                {
                    type: 'wordcloud',
                    data: this.textStringToJsonArray(this.props.text),
                    name: this.props.name,
                },
            ],
            title: {
                text: this.props.title,
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

SBH_WordCloud.propTypes = {
    title: PropTypes.string,
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default SBH_WordCloud;
