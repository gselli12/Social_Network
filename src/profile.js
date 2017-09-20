import React from 'react';
import {ProfilePic} from './profilepic';
import {Bio} from "./bio";


export function Profile(props) {
    const {image, first, last, bio, editBioIsVisible, updateBio, showEditBio, readInput} = props.profile;
    return (
        <div className ="profile">
            <div className = "large-pic"><ProfilePic image = {image} /></div>
            <div className="info-profile">
                <p>{first}</p>
                <Bio bio = {bio}
                    editBioIsVisible = {editBioIsVisible}
                    updateBio = {updateBio}
                    showEditBio = {showEditBio}
                    readInput = {readInput}
                />
            </div>
        </div>
    );
}
