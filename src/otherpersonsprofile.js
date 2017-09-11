import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {FriendButton} from './friendbutton';

export class OtherPersonsProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let id = this.props.params.id;
        axios.get("/api/user/"+id)
            .then((data) => {
                const {first, last, image, bio, friendshipStatus, isSender} = data.data;
                // console.log("data",data.data);
                // console.log("this", this);
                this.friendshipStatus = friendshipStatus;
                this.isSender = isSender;
                this.setState({
                    first,
                    last,
                    bio,
                    image: "https://mypracticesn.s3.amazonaws.com/" + image
                });
                console.log(this.state);
            });
    }
    render() {
        let {first, last, image, bio} = this.state;
        let {friendshipStatus, isSender} = this;
        let id = this.props.params.id;
        console.log(this.state.first);
        return(
            <div className = "profile">

                <img
                    className = "profilePic"
                    id="large-pic" src = {image}
                />
                <div className="info-profile">
                    <p>{first} {last}</p>
                    <p>{bio}</p>

                    {this.state.first &&
                        <FriendButton
                            id={id}
                            friendshipStatus = {friendshipStatus}
                            isSender = {isSender}
                        />
                    }

                </div>

            </div>


        );
    }
}