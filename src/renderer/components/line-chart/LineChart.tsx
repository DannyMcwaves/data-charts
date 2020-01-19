import * as React from 'react';
import * as d3 from 'd3';
import { CoinDeskBitcoinData, ParsedCoinDeskData } from '../../types';

// import styles for the main application
import './LineChart.scss';


class LineChart extends React.Component {

    apiEndpoint: string = "https://api.coindesk.com/v1/bpi/historical/close.json?start=2015-12-31&end=2020-04-01";

    /**
     * Parse data into key-value pairs
     * @param {object} data Object containing historical data of BPI
     */
    static parseData(data: CoinDeskBitcoinData) {
        const arr: ParsedCoinDeskData[] = [];

        // loop through data BPI
        for (const i in data.bpi) {
            if(data.bpi.hasOwnProperty(i)) {
                arr.push({  date: new Date(i),  value: data.bpi[i] });
            }
        }

        return arr;
    }

    /**
     * fetch data from backend API
     */
    async fetchDataFromAPI() {
        return await fetch(this.apiEndpoint)
            .then( response =>  response.json() )
            .catch(err => ({bpi: {}, disclaimer: "", time: { updated: "", updateISO: ""}}));
    }

    /**
     * Creates a chart using D3
     * @param {object} data Object containing historical data of BPI
     */
    drawChart(data: ParsedCoinDeskData[]) {
        const svgWidth = 600;
        const svgHeight = 400;
        const margin = { top: 20, right: 20, bottom: 30, left: 50 };
        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;

        const svg = d3.select('svg.line-chart')
            .attr("width", svgWidth)
            .attr("height", svgHeight);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const x = d3.scaleTime()
            .rangeRound([0, width]);

        const y = d3.scaleLinear()
            .rangeRound([height, 0]);

        const line = d3.line()
            // @ts-ignore
            .x(d => x(d.date))
            // @ts-ignore
            .y(d => y(d.value));

        // @ts-ignore
        x.domain(d3.extent(data, d => d.date));

        // @ts-ignore
        y.domain(d3.extent(data, d => d.value));

        g.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .select(".domain")
            .remove();

        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Price ($)");

        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            // @ts-ignore
            .attr("d", line);
    }

    // make a d3 graph representation from data returned from the API...
    async makeD3graph() {
        // fetch data from the API
        const data = await this.fetchDataFromAPI();

        // parse the data returned from the API...
        const parsed = LineChart.parseData(data);

        // draw the application when the component has loaded...
        this.drawChart(parsed);
    }

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
            <div id="LineChart" className="menu row justify-content-around align-content-center">
                <div className="charts-holder align-self-center">
                    <svg className="line-chart" />
                </div>
            </div>
        );
    }

    componentDidMount(): void {
        this.makeD3graph();
    }
}

export default LineChart;
