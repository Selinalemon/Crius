import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, BrowserRouter } from 'react-router-dom';
import * as routePaths from './js/constants/routePaths';
import Bundle from './js/constants/Bundle.js';
//默认打开页面直接引入
import Index from './js/pages/Index';
//其他页面异步引入
import CardContainer from 'bundle-loader?lazy&name=app-[name]!./js/pages/Card';
import './assets/css/index.scss';

const Card = () => (
    <Bundle load={CardContainer}>
        {(Card) => <Card />}
    </Bundle>
)

ReactDOM.render((
    <HashRouter>
        <div className="container">
            <Route path={routePaths.INDEX} exact component={Index} />
            <Route path={routePaths.CARD} component={Card} />
        </div>
    </HashRouter>
    ),
    document.getElementById('app')
);
