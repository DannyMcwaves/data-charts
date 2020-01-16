import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import styles for the main application
import './Application.scss';

import Index from '../index/Index';
import FourOhFour from '../404/404';

const Application = () => (
    <div id="app" className="row">
        <Router>
            <Switch>
                <Route exact={true} path="/">
                    {' '}
                    <Index />{' '}
                </Route>
                <Route path="*">
                    {' '}
                    <FourOhFour />{' '}
                </Route>
            </Switch>
        </Router>
    </div>
);

export default hot(Application);
