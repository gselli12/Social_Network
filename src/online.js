import React from "react";
import { connect } from 'react-redux';
import {Link} from 'react-router';


class Online extends React.Component {
    render() {
        if(!this.props) {
            return null;
        }

        const users = this.props.users;

        var onlineUsers;
        if(users) {
            onlineUsers= Object.keys(users).map((user, i) => {
                let {first, last, image, id} = users[user];
                return (
                    <Link to = {"/user/"+ id}>
                        <div className = "online-user">
                            <img className ="profilePic large-pic" src ={image} />
                            <div className ="name-online">{first}</div>
                        </div>
                    </Link>
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
