import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import { Welcome, Register, Login } from './welcome';
import axios from 'axios';
import {App} from './app';
import {Profile} from "./profile";

// var router = (
//     <Router history={hashHistory}>
//         <Route path="/" component={Welcome}>
//             <Route path="/login" component={Login} />
//             <IndexRoute component={Register} />
//         </Route>
//     </Router>
// );

var router;


if(location.pathname == "/welcome") {
    router = (
        <Router history={hashHistory}>
            <Route path="/" component={Welcome}>
                <Route path="/login" component={Login} />
                <IndexRoute component={Register} />
            </Route>
        </Router>);
} else {
    router = (
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Profile} />
            </Route>
        </Router>
    );
    //comp = <App />;
}

ReactDOM.render(
    router,
    document.querySelector('main')
);
