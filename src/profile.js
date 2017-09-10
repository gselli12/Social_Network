import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {ProfilePic} from './profilepic';
import {Bio} from "./bio";

export function Profile(props) {

    return (
        <div className ="profile">
            <div id = "large-pic"><ProfilePic image = {props.image} /></div>
            <div className="info-profile">
                <p>{props.first} {props.last}</p>
                <Bio bio = {props.bio} editBioIsVisible = {props.editBioIsVisible} updateBio = {props.updateBio} showEditBio = {props.showEditBio} readInput = {props.readInput}/>
            </div>
        </div>
    );
}
