import React from 'react';
import { connect } from 'react-redux';
import{getFriends, acceptRequest, unfriend, rejectRequest} from './actions.js';


class Friends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
        this.unfriend = this.unfriend.bind(this);
        this.rejectFriendRequest = this.rejectFriendRequest.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getFriends());
    }
    acceptFriendRequest(id) {
        this.props.dispatch(acceptRequest(id));
    }
    rejectFriendRequest(id) {
        this.props.dispatch(rejectRequest(id));
    }
    unfriend(id) {
        this.props.dispatch(unfriend(id));
    }
    render() {
        const {friends, pendings} = this.props;
        if(!friends) {
            return null;
        }
        let myFriends =
            friends.map((friend) => {
                let {id, first, last, image} = friend;
                return (
                    <div className = "friend-single">
                        <p>{first} {last}</p>
                        <img src = {image} alt="" className="profilePic large-pic"/>
                        <button onClick={() => this.unfriend(id)}>unfriend</button>
                    </div>
                );
            });
        let myPendings =
            pendings.map((pending) => {
                const {id, first, last, image} = pending;
                return (
                    <div className ="pending-single">
                        <p>{first} {last}</p>
                        <img src = {image} className="profilePic large-pic" alt=""/>
                        <button onClick={() => this.acceptFriendRequest(id)}>accept</button>
                        <button onClick = {() => this.rejectFriendRequest(id)}>reject</button>
                    </div>
                );
            });

        return(
            <div>
                <h3>Pending Friend Requests</h3>
                <div className="pending">
                    {myPendings}
                </div>

                <h3>These are your friends</h3>
                <div className = "friends">
                    {myFriends}
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        friends: state.friends && state.friends.filter(friend => friend.status == "FRIENDS"),
        pendings: state.friends && state.friends.filter(friend => friend.status == "PENDING"),
    };
};

export default connect(mapStateToProps)(Friends);
