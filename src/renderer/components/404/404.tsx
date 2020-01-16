import * as React from 'react';
import { Link } from 'react-router-dom';

// import styles for the main application
import './404.scss';

class FourOhFour extends React.Component {
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
                <div className="align-self-center">
                    <Link to="/"> HOME </Link>
                </div>
            </div>
        );
    }
}

export default FourOhFour;
