import React from 'react';
import { connect } from 'react-redux';
import{getFriends} from './actions.js';


class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(getFriends());
    }
    render() {
        const {friends} = this.props;
        console.log("friends", friends);
        if(!friends) {
            return null;
        }
        let myFriends =
            friends.map((friend) => {
                return (<div><p>{friend.first} {friend.last}</p>
                    <img src = {friend.image} alt=""/></div>);
            });
        console.log(friends[0])
        console.log(myFriends);

        return(
            <div>
                {myFriends}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("mapStateToProps");
    return {
        friends: state.friends
    };
};

// const mapDispatchToProps = function(dispatch) {
//     console.log("mapDispatchToProps");
//     return {
//         getFriends: () => dispatch(getFriends())
//     };
// };

export default connect(mapStateToProps)(Friends);
