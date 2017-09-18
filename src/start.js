import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import {Welcome, Register, Login} from './welcome';
import {App} from './app';
import {Profile} from "./profile";
import {OtherPersonsProfile} from "./otherpersonsprofile";
import Friends from "./friends";
import Online from "./online";

//REDUX
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';
import {Provider} from 'react-redux';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));



let welcomeRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Welcome}>
            <Route path="/login" component={Login} />
            <IndexRoute component={Register} />
        </Route>
    </Router>
);

let loggedInRouter = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="/online" component={Online}/>
                <Route path="/me" component = {Profile} />
                <Route path="/user/:id" component={OtherPersonsProfile} />
                <IndexRoute component={Friends} />
            </Route>
        </Router>
    </Provider>
);

let routerToRender;
location.pathname == "/welcome" ? routerToRender = welcomeRouter : routerToRender = loggedInRouter;


ReactDOM.render(
    routerToRender,
    document.querySelector('main')
);
