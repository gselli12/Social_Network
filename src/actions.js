import axios from 'axios';

export function getFriends() {
    return axios.get("/api/friends")
        .then(({data}) => {
            console.log(data.friends);
            return {
                type: 'RECEIVE_FRIENDS',
                friends: data.friends
            };
        });
}
