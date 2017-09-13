import React from 'react';
import { connect } from 'react-redux';
import{getFriends} from './actions.js';


class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(getFriends());
    }
    render() {
        const {friends, pendings} = this.props;
        console.log("friends", friends);
        if(!friends) {
            return null;
        }
        let myFriends =
            friends.map((friend) => {
                return (
                    <div className = "friend-single">
                        <p>{friend.first} {friend.last}</p>
                        <img src = {friend.image} alt="" className="profilePic large-pic"/>
                    </div>
                );
            });
        let myPendings =
            pendings.map((pending) => {
                return (

                    <div className ="pending-single">
                        <p>{pending.first} {pending.last}</p>
                        <img src = {pending.image} className="profilePic large-pic" alt=""/>
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
    console.log("mapStateToProps");
    return {
        friends: state.friends && state.friends.filter(friend => friend.status == "FRIENDS"),
        pendings: state.friends && state.friends.filter(friend => friend.status == "PENDING")
    };
};

// const mapDispatchToProps = function(dispatch) {
//     console.log("mapDispatchToProps");
//     return {
//         getFriends: () => dispatch(getFriends())
//     };
// };

export default connect(mapStateToProps)(Friends);
