import React from 'react';
import axios from 'axios';
import {FriendButton} from './friendbutton';

export class OtherPersonsProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {};
    }
    getData() {
        let id = this.props.params.id;
        axios.get("/api/user/"+id)
            .then((data) => {
                const {first, last, image, bio, friendshipStatus, isSender} = data.data;
                this.friendshipStatus = friendshipStatus;
                this.isSender = isSender;
                this.setState({
                    first,
                    last,
                    bio,
                    image: "https://mypracticesn.s3.amazonaws.com/" + image
                });
            });
    }

    componentDidMount() {
        this.getData();
    }
    componentWillReceiveProps() {
        this.getData();
    }
    render() {
        let {first, last, image, bio} = this.state;
        let {friendshipStatus, isSender} = this;
        let id = this.props.params.id;
        return(
            <div className = "profile">

                <img
                    className = "profilePic large-pic"
                    src = {image}
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
