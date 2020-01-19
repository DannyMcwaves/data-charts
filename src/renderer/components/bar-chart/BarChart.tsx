import * as React from 'react';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';

// import styles for the main application
import './BarChart.scss';
import { RandomItemInArray } from '../../utils';


class BarChart extends React.Component {

    // tslint:disable-next-line:max-line-length
    render():
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | string
        | number
        | {}
        | React.ReactNodeArray
        | React.ReactPortal
        | boolean
        | null
        | undefined {
        return (
            <div id="BarChart" className="menu row justify-content-around align-content-center">
                <div className="charts-holder align-self-center">
                    <svg className="bar-chart" />
                </div>
            </div>
        );
    }

    componentDidMount(): void {
        // javascript
        const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
        const colorFills = ["#c08e18", "#fff", "green", "#c01a54", "#11c0b3", "#8aaec0", "#c01a54"];
        const chosenColor = RandomItemInArray(colorFills);

        const svgWidth = 500;
        const svgHeight = 300;
        const barPadding = 5;

        const barWidth = svgWidth / dataset.length;
        const svg = d3.select('svg.bar-chart')
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        const yScale = d3.scaleLinear()
            // @ts-ignore
            .domain([0, d3.max(dataset)])
            .range([0, svgHeight]);

        const xScale = d3.scaleLinear()
            // @ts-ignore
            .domain([0, d3.max(dataset)])
            .range([0, svgWidth]);

        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("y", (d) => svgHeight - yScale(d))
            .attr("height", (d) =>  yScale(d))
            .attr("width", barWidth - barPadding)
            .attr("class", "bar")
            .attr("fill", chosenColor)
            .attr("transform",  (d, i) => {
                const translate = [barWidth * i, 0];
                return `translate(${translate})`;
            });

        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text((d) => d)
            .attr("y", (d, i) => svgHeight - yScale(d) - 5)
            .attr("x", (d, i) => barWidth * i + 15)
            .attr("fill", chosenColor);

        // @ts-ignore
        const x_axis = d3.axisBottom()
            .scale(xScale);

        // @ts-ignore
        const y_axis = d3.axisLeft()
            .scale(yScale);

        svg.append("g")
            .attr("transform", "translate(50, 10)")
            .call(y_axis);

        const xAxisTranslate = svgHeight - 20;

        svg.append("g")
            .attr("transform", `translate(50, ${xAxisTranslate})`)
            .call(x_axis);
    }
}

export default BarChart;
