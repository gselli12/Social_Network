import React from "react";
import { connect } from 'react-redux';
import {getSocket} from "./socket";
import * as io from 'socket.io-client';
const socket = io.connect();
import {onlineUser, onlineUsers} from "./actions";

class Online extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        socket.on("connect", () => {
            this.props.dispatch((onlineUser(socket.id)));

            socket.on("onlineUsers", (users) => {
                console.log("onlineUsers", users);
                if(users != undefined) {
                    this.props.dispatch(onlineUsers(users));
                }
            });
            socket.on("userJoined", () => {
                console.log("userJoined");
            });

        });
    }
    render() {
        console.log("this.props", this.props)
        const {users} = this.props;

        var onlineUsers;
        if(users) {
            onlineUsers = users.map((user) => {
                let {first, last, image} = user;
                return (
                    <div><img src ={"https://mypracticesn.s3.amazonaws.com/" + image} />{first} {last}</div>
                );
            });
        }

        return(
            <div>
                {onlineUsers}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        users: state.users,
        //friends: state.friends && state.friends.filter(friend => friend.status == "FRIENDS"),
        // pendings: state.friends && state.friends.filter(friend => friend.status == "PENDING"),
    };
};

export default connect(mapStateToProps)(Online);
