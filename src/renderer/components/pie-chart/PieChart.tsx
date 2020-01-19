import * as React from 'react';
import * as d3 from 'd3';

// import styles for the main application
import './PieChart.scss';
import { PieChartDataInterface, PieChartDataType } from '../../types';


class PieChart extends React.Component {

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
            <div id="PieChart" className="menu row justify-content-around align-content-center">
                <div className="charts-holder align-self-center">
                    <svg className="pie-chart" />
                </div>
            </div>
        );
    }

    componentDidMount(): void {
        // javascript
        const data: PieChartDataType[] = [
            {"platform": "Android", "percentage": 40.11},
            {"platform": "Windows", "percentage": 36.69},
            {"platform": "iOS", "percentage": 13.06}
        ];

        const svgWidth = 500;
        const svgHeight = 300;
        const radius =  Math.min(svgWidth, svgHeight) / 2;
        const svg = d3.select('svg.pie-chart')
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        // Create group element to hold pie chart
        // g is a group element within svg that holds other elements.
        const g = svg.append("g")
            .attr("transform", `translate(${radius}, ${radius})`) ;

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // d3 pie API for creating pie charts...
        // @ts-ignore
        const pie = d3.pie().value(d =>  d.percentage);

        const path = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

        const arc = g.selectAll("arc")
            // @ts-ignore
            .data(pie(data))
            .enter()
            .append("g");

        arc.append("path")
            // @ts-ignore
            .attr("d", path)
            // @ts-ignore
            .attr("fill", d => color(d.data.percentage));

        const label = d3.arc()
            .outerRadius(radius)
            .innerRadius(0);

        arc.append("text")
            // @ts-ignore
            .attr("transform", d => `translate(${label.centroid(d)})`)
            .attr("text-anchor", "middle")
            // @ts-ignore
            .text(d => `${d.data.platform}: ${d.data.percentage}%`);
    }
}

export default PieChart;
