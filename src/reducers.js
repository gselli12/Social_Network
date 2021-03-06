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
        state = Object.assign({}, state, {
            users: action.users
        });
    }
    if(action.type == 'USER_JOINED') {
        if(state.users && !state.users.find(user => user.id == action.user.id)) {
            state = Object.assign({}, state, {
                users: state.users ? [...state.users, action.user] : [action.user]
            });
        }
    }
    if(action.type == "USER_LEFT") {
        state = Object.assign({}, state, {
            users: state.users.filter(user => {
                if(user.id == action.user.userLeft) {
                    return null;
                }
                return user;
            })
        });
    }
    if(action.type == "RECEIVED_CHAT") {
        state = Object.assign({}, state, {
            chat: action.chat
        });
    }
    if(action.type == "WRITING_COMMENT") {
        state = Object.assign({}, state, {
            comment: action.comment
        });
    }
    if(action.type == "NEW_COMMENT") {
        state = Object.assign({}, state, {
            chat: state.chat ? [...state.chat, action.comment] : [action.comment]
        });
    }
    if(action.type == "USER_SEARCH") {
        state = Object.assign({}, state, {
            searchResults: action.searchResults
        });
    }
    if(action.type == "CLEAR_SEARCHBAR") {
        state = Object.assign({}, state, {
            searchResults: null
        });
    }
    if(action.type == "WRITING_POST") {
        state = Object.assign({}, state, {
            postWriting: action.post
        });
    }
    if(action.type == "CHANGE_SUBMITTYPE") {
        state = Object.assign({}, state, {
            submitType: action.typeS
        });
    }
    return state;
}
