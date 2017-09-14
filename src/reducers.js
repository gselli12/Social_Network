export default function(state = {}, action) {
    if(action.type == "RECEIVE_FRIENDS") {
        state = Object.assign({}, state, {
            friends: action.friends
        });
    }
    if(action.type == "UNFRIEND") {
        console.log(action.type);
        state = Object.assign({}, state, {
            friends: state.friends.map((friend) => {
                if(friend.id == action.id) {
                    return Object.assign({},
                        friend, {
                            status: 'NOT FRIENDS'
                        });
                }
                return friend;
            })
        });
        console.log(state);
    }
    if(action.type == "ACCEPT_REQUEST") {
        console.log(action.type);
        state = Object.assign({}, state, {
            friends: state.friends.map((friend) => {
                if(friend.id == action.id) {
                    return Object.assign({}, friend, {
                        status: 'FRIENDS'
                    });
                }
                return friend;
            })
        });
    }
    if(action.type == "REJECT_REQUEST") {
        console.log(action.type);
        state = Object.assign({}, state, {
            friends: state.friends.map((friend) => {
                if(friend.id == action.id) {
                    return Object.assign({}, friend, {
                        status: 'NOT FRIENDS'
                    });
                }
                return friend;
            })
        });
    }
    return state;
}
