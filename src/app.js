import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {Logo} from './logo';
import {ProfilePic} from './profilepic';



export function App(props) {
    return (
        <div>
            <header><Logo /> <ProfilePic /></header>
            <p>This is your app page</p>
            {props.children}
        </div>
    );
}
