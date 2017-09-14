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
        .then(({data}) => {
            console.log(data);
            return {
                type: 'ACCEPT_REQUEST',
                id
            };
        });
}

export function unfriend(id) {
    return axios.post("/user/" + id + "/unfriend")
        .then(({data}) => {
            console.log(data);
            return {
                type: "UNFRIEND",
                id
            };
        });
}

export function rejectRequest(id) {
    return axios.post("/user/" + id + "/rejectfriendrequest")
        .then(({data}) => {
            console.log(data);
            return {
                type: 'REJECT_REQUEST',
                id
            };
        });
}
