import * as io from 'socket.io-client';
const socket = io.connect();
import {onlineUser} from "./actions";

export function getSocket() {
    if(!socket) {

    }
    console.log(socket);
    return socket;
}
