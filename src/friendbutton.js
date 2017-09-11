import React from 'react';
import axios from './axios';

export class FriendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.sendFriendRequest = this.sendFriendRequest.bind(this);
    }
    sendFriendRequest() {
        let id = this.props.id;
        console.log(id);
        axios.post("/user/" + id + "/sendfriendrequest");
    }
    render() {
        return(
            <button onClick = {this.sendFriendRequest}>Request</button>
        );

    }
}
