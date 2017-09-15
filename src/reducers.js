export default function(state = {}, action) {
    if(action.type == "RECEIVE_FRIENDS") {
        state = Object.assign({}, state, {
            friends: action.friends
        });
    }
    if(action.type == "UNFRIEND") {
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
    }
    if(action.type == "ACCEPT_REQUEST") {
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
    if(action.type == 'USERS_ONLINE') {
        console.log("reducer users", action.users)
        state = Object.assign({}, state, {
            users: action.users
        });
        console.log("state", state);
    }
    return state;
}
