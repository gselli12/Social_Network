import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {ProfilePic} from './profilepic';

export function Profile(props) {
    return (
        <div className ="profile">
            <div id = "large-pic"><ProfilePic image = {props.image} /></div>
            <div className="info-profile">
                <p>{props.first} {props.last}</p>
                <p>{props.bio}</p>
            </div>
        </div>
    );
}
