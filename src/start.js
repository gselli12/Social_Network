import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import { Welcome, Register, Login} from './welcome';
import {App} from './app';
import {Profile} from "./profile";
import {OtherPersonsProfile} from "./otherpersonsprofile";

let welcomeRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            <IndexRoute component={Register} />
        </Route>
    </Router>
);

let loggedInRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/user/:id" component={OtherPersonsProfile} />
            <IndexRoute component={Profile} />
        </Route>
    </Router>
);

let routerToRender;
location.pathname == "/welcome" ? routerToRender = welcomeRouter : routerToRender = loggedInRouter;


ReactDOM.render(
    routerToRender,
    document.querySelector('main')
);
