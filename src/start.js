import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Register} from './register';
import {Logo} from './logo';

let comp;
if(location.pathname == "/welcome") {
    comp = <Welcome />;
} else {
    comp = <Logo />;
}

ReactDOM.render(
    comp,
    document.querySelector('main')
);

function Welcome() {
    return (
        <div>
            <h2>Welcome to</h2>
            <img src="logo.png"/>
            <h3>We are rebelling becasue all the other online communities are revolting.</h3>
            <h4>Join the rebellion!</h4>
            <Register />
        </div>
    );
}
