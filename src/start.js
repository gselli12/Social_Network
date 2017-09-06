import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import { Welcome, Register, Login } from './welcome';
import axios from 'axios';
import {Logo} from './logo';

var router = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            <IndexRoute component={Register} />
        </Route>
    </Router>
);

var comp;
if(location.pathname == "/welcome") {
    comp = router;
} else {
    comp = <Logo />;
}

ReactDOM.render(
    comp,
    document.querySelector('main')
);
