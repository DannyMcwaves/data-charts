import * as React from 'react';
import * as d3 from 'd3';
import { Link } from 'react-router-dom';

// import styles for the main application
import './Index.scss';

// @ts-ignore
import webcamPng from '../../static/images/webcam.png';

class Index extends React.Component {
    private charts_ref: React.RefObject<unknown>;

    constructor(props: any) {
        super(props);
        this.charts_ref = React.createRef();
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
            <div className="menu row justify-content-around align-content-center">
                <div className="charts-holder align-self-center">
                    <Link to="/about">
                        <img alt="logo" src={webcamPng} />
                    </Link>
                </div>
                <div className="link">
                    <Link to="/bar"> Bar </Link> <br/>
                    <Link to="/pie"> Pie </Link> <br/>
                    <Link to="/line"> Line </Link> <br/>
                </div>
            </div>
        );
    }

    componentDidMount(): void {
        // some sample data for the charts
        const data = [30, 86, 168, 281, 303, 365];

        d3.select('div.charts-holder')
            .selectAll('div')
            .data(data)
            .enter()
            .append('div')
            .style('width', d => `${d}px`)
            .text(d => d);
    }
}

export default Index;
