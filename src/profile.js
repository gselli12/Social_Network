import React from 'react';
import {ProfilePic} from './profilepic';
import {Bio} from "./bio";
import Wallposts from "./wallpost";



export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const {id, image, first, last, bio, editBioIsVisible, updateBio, showEditBio, readInput, wallPosts} = this.props.profile;

        return (

            <div className ="profile">
                <div className = "large-pic" style={{left: "30%"}}><ProfilePic image = {image} /></div>
                <div className="info-profile">
                    <p>{first}</p>
                    <Bio bio = {bio}
                        editBioIsVisible = {editBioIsVisible}
                        updateBio = {updateBio}
                        showEditBio = {showEditBio}
                        readInput = {readInput}
                    />

                    <Wallposts first={first} last={last} image={image} id={id} wallPosts={wallPosts}/>

                </div>

            </div>
        );
    }

}
