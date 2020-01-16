import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import Application from './components/app/Application';
import store from './store';

import './app.scss';
import 'bootstrap-4-grid/scss/grid.scss';

// Create main element
const mainElement = document.createElement('div');
mainElement.id = 'main';
mainElement.className = 'container-fluid';
document.body.appendChild(mainElement);

// Render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component />
            </Provider>
        </AppContainer>,
        mainElement
    );
};

render(Application);
