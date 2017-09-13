export default function(state = {}, action) {
    if(action.type == "RECEIVE_FRIENDS") {
        console.log("action.type receive friends", action.type);
        state = Object.assign({}, state, {
            friends: action.friends
        });
    }
    return state;
}
