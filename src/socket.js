import * as io from 'socket.io-client';

import {onlineUser, onlineUsers, userJoined, userLeft} from "./actions";

import {store} from "./start";

export function getSocket() {
    const socket = io.connect();
    socket.on("connect", () => {
        store.dispatch((onlineUser(socket.id)));

        socket.on("onlineUsers", (users) => {
            if(users != undefined) {
                store.dispatch(onlineUsers(users));
            }
        });
        socket.on("userJoined", (user) => {
            store.dispatch(userJoined(user));
        });
        socket.on("userLeft", (user) => {
            store.dispatch(userLeft(user));
        });
    });

    return socket;
}
