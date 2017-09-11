import React from 'react';
import axios from './axios';

export class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.sendFriendRequest = this.sendFriendRequest.bind(this);
        this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
        this.unfriend = this.unfriend.bind(this);
        this.resendFriendRequest = this.resendFriendRequest.bind(this);
        this.cancelFriendRequest = this.cancelFriendRequest.bind(this);
    }
    sendFriendRequest() {
        let id = this.props.id;
        axios.post("/user/" + id + "/sendfriendrequest");
    }
    acceptFriendRequest() {
        let id = this.props.id;
        axios.post("/user/" + id + "/acceptfriendrequest");
    }
    unfriend() {
        let id = this.props.id;
        axios.post("/user/" + id + "/unfriend");
    }
    resendFriendRequest() {
        let id = this.props.id;
        axios.post("/user/" + id + "/resendfriendrequest");
    }
    cancelFriendRequest() {
        let id = this.props.id;
        axios.post("/user/" + id + "/cancelfriendrequest");
    }
    render() {
        let {friendshipStatus, isSender} = this.props;
        console.log(friendshipStatus == "NOT FRIENDS");
        return(
            <div>
                {friendshipStatus == "NOT FRIENDS" &&
                    <button onClick = {this.sendFriendRequest}>Send Friendrequest</button>
                }
                {friendshipStatus == "DELETED" &&
                    <button onClick = {this.resendFriendRequest}>Send FriendRequest</button>
                }
                {friendshipStatus == "CANCELED" &&
                    <button onClick = {this.resendFriendRequest}>Send FriendRequest</button>
                }
                {friendshipStatus == "PENDING" && !isSender &&
                    <button onClick = {this.acceptFriendRequest}>Accept request</button>
                }
                {friendshipStatus == "PENDING" && isSender &&
                    <button onClick={this.cancelFriendRequest}>Cancel friendrequest</button>
                }
                {friendshipStatus == "FRIENDS" &&
                    <button onClick = {this.unfriend}>Unfriend</button>
                }
            </div>

        );

    }
}
