import React from "react";
import { connect } from 'react-redux';
//import {getSocket} from "./socket";
import * as io from 'socket.io-client';
const socket = io.connect();
import {onlineUser, onlineUsers, userJoined, userLeft} from "./actions";

class Online extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        socket.on("connect", () => {
            this.props.dispatch((onlineUser(socket.id)));

            socket.on("onlineUsers", (users) => {
                if(users != undefined) {
                    this.props.dispatch(onlineUsers(users));
                }
            });
            socket.on("userJoined", (user) => {
                this.props.dispatch(userJoined(user));
            });
            socket.on("userLeft", (user) => {
                this.props.dispatch(userLeft(user));
            });
        });
    }
    render() {
        if(!this.props) {
            return null;
        }

        const users = this.props.users;

        var onlineUsers;
        if(users) {

            onlineUsers= Object.keys(users).map((user, i) => {
                let {first, last, image} = users[user];
                return (
                    <div className = "online-user"><img className ="profilePic large-pic" src ={"https://mypracticesn.s3.amazonaws.com/" + image} /><div className ="name-online">{first} {last}</div></div>
                );
            });
        }

        return(
            <div className ="online-list">
                <h2>These users are online right now</h2>
                {onlineUsers}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        users: state.users
    };
};

export default connect(mapStateToProps)(Online);
