import * as io from 'socket.io-client';

import {onlineUser, onlineUsers, userJoined, userLeft, getInitialComments, newComment} from "./actions";

import {store} from "./start";

export const socket = io.connect();

export function getSocket() {

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

        socket.on("chatMessages", (chat) => {
            store.dispatch(getInitialComments(chat));
        });

        socket.on("chatMessage", (data) => {
            if(data) {
                store.dispatch(newComment(data));
            }
        });
    });

    return socket;
}
