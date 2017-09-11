import React from 'react';
import axios from './axios';

export class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendshipStatus: this.props.friendshipStatus,
            isSender: this.props.isSender
        };
        this.sendFriendRequest = this.sendFriendRequest.bind(this);
        this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
        this.unfriend = this.unfriend.bind(this);
        this.resendFriendRequest = this.resendFriendRequest.bind(this);
        this.cancelFriendRequest = this.cancelFriendRequest.bind(this);
        this.rejectFriendRequest = this.rejectFriendRequest.bind(this);
    }
    updateButton(status, sender) {
        this.setState({
            friendshipStatus: status,
            isSender: sender
        });
    }
    sendFriendRequest() {
        let id = this.props.id;
        axios.post("/user/" + id + "/sendfriendrequest");
        this.updateButton("PENDING", true);
    }
    acceptFriendRequest() {
        let id = this.props.id;
        axios.post("/user/" + id + "/acceptfriendrequest");
        this.updateButton("FRIENDS", null);
    }
    unfriend() {
        let id = this.props.id;
        axios.post("/user/" + id + "/unfriend");
        this.updateButton("DELETED", null);
    }
    resendFriendRequest() {
        let id = this.props.id;
        axios.post("/user/" + id + "/resendfriendrequest");
        this.updateButton("PENDING", true);
    }
    cancelFriendRequest() {
        let id = this.props.id;
        axios.post("/user/" + id + "/cancelfriendrequest");
        this.updateButton("CANCELED", null);
    }
    rejectFriendRequest() {
        let id = this.props.id;
        console.log("POST");
        axios.post("/user/" + id + "/rejectfriendrequest");
        this.updateButton("REJECTED", null);
    }
    render() {
        let {friendshipStatus, isSender} = this.state;
        return(
            <div>
                {friendshipStatus == "NOT FRIENDS" &&
                    <button onClick = {this.sendFriendRequest}>Send Friendrequest</button>
                }
                {(friendshipStatus == "DELETED" || friendshipStatus == "CANCELED" || friendshipStatus == "REJECTED") &&
                    <button onClick = {this.resendFriendRequest}>Send Friendrequest</button>
                }

                {friendshipStatus == "PENDING" && !isSender &&
                    <div>
                        <button onClick = {this.acceptFriendRequest}>Accept request</button>
                        <button onClick = {this.rejectFriendRequest}>Reject request</button>
                    </div>
                }
                {friendshipStatus == "PENDING" && isSender &&
                    <button onClick={this.cancelFriendRequest}>Cancel Friendrequest</button>
                }
                {friendshipStatus == "FRIENDS" &&
                    <button onClick = {this.unfriend}>Unfriend</button>
                }
            </div>

        );

    }
}
