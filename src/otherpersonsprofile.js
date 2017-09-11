import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {FriendButton} from './friendbutton';

export class OtherPersonsProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillReceiveProps() {
        let id = this.props.params.id;
        axios.get("/api/user/"+id)
            .then((data) => {
                const {first, last, image, bio} = data.data;
                this.setState({
                    first,
                    last,
                    bio,
                    image: "https://mypracticesn.s3.amazonaws.com/" + image
                });
            });
    }
    render() {
        let {first, last, image, bio} = this.state;
        let id = this.props.params.id;
        return(
            <div className = "profile">
                <img className = "profilePic" id="large-pic" src = {image} />
                <div className="info-profile">
                    <p>{first} {last}</p>
                    <p>{bio}</p>
                    <FriendButton id={id}/>
                </div>
            </div>
        );
    }
}



// export function OtherPersonsProfile(props) {
//     return(
//         <div>
//             <p>{props.first}{props.last}</p>
//             <p>{props.bio}</p>
//         </div>
//     )
// }
