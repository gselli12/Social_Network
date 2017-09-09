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

// export class Profile extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//         this.showEditBio = this.showEditBio.bind(this);
//         this.readInput = this.readInput.bind(this);
//     }
//     showEditBio() {
//         this.setState({
//             editBioIsVisible: true
//         });
//     }
//     readInput(e) {
//         this.setState({
//             textareaBio : e.target.value
//         });
//         console.log("change", this.state.textareaBio);
//     }
//     render() {
//         return (
//             <div className ="profile">
//                 <div id = "large-pic"><ProfilePic image = {this.image} /></div>
//                 <div className="info-profile">
//                     <p>{this.first} {this.last}</p>
//                     <Bio bio = {this.bio} editBioIsVisible = {this.editBioIsVisible} showEditBio = {this.showEditBio} readInput = {this.readInput}/>
//                 </div>
//             </div>
//         );
//     }
// }
