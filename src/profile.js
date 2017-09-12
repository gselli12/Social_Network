import React from 'react';
import {ProfilePic} from './profilepic';
import {Bio} from "./bio";


export function Profile(props) {
    return (
        <div className ="profile">
            <div id = "large-pic"><ProfilePic image = {props.profile.image} /></div>
            <div className="info-profile">
                <p>{props.profile.first} {props.profile.last}</p>
                <Bio bio = {props.profile.bio}
                    editBioIsVisible = {props.profile.editBioIsVisible}
                    updateBio = {props.profile.updateBio}
                    showEditBio = {props.profile.showEditBio}
                    readInput = {props.profile.readInput}
                />
            </div>
        </div>
    );
}
