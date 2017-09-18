import axios from './axios';

export function getFriends() {
    return axios.get("/api/friends")
        .then(({data}) => {
            return {
                type: 'RECEIVE_FRIENDS',
                friends: data.friends
            };
        });
}

export function acceptRequest(id) {
    return axios.post("/user/" + id + "/acceptfriendrequest")
        .then(() => {
            return {
                type: 'ACCEPT_REQUEST',
                id
            };
        });
}

export function unfriend(id) {
    return axios.post("/user/" + id + "/unfriend")
        .then(() => {
            return {
                type: "UNFRIEND",
                id
            };
        });
}

export function rejectRequest(id) {
    return axios.post("/user/" + id + "/rejectfriendrequest")
        .then(() => {
            return {
                type: 'REJECT_REQUEST',
                id
            };
        });
}

export function onlineUser(id) {
    return axios.get("/connected/" + id)
        .then(() => {
            return {
                type: 'USER_ONLINE'
            };
        });
}

export function onlineUsers(users) {
    return {
        type: 'USERS_ONLINE',
        users
    };
}

export function userJoined(user) {
    return {
        type: 'USER_JOINED',
        user
    };
}

export function userLeft(user) {
    return {
        type: "USER_LEFT",
        user
    };
}

export function getInitialComments(chat) {
    return {
        type: "RECEIVED_CHAT",
        chat
    };
}

export function readComment(comment) {
    return {
        type: "WRITING_COMMENT",
        comment
    };
}

export function newComment(comment) {
    return {
        type: "NEW_COMMENT",
        comment
    };
}
