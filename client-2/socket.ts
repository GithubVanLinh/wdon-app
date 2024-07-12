"use client";

import { Socket, io } from "socket.io-client";
import { Message } from "./utils/type/conversation";

interface ServerToClient {
  "new-message": (message: Message) => void;
}

interface ClientToServer {}

let _socket: Socket<ServerToClient, ClientToServer> | null = null;

const getSocket = () => {
  if (!_socket) {
    _socket = io("ws://localhost:3001", {
      // autoConnect: false,
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  return _socket;
};

const disconnectSocket = () => {
  _socket = null;
};

// export const socket = io("ws://localhost:3001", {
//   // autoConnect: false,
//   extraHeaders: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });

export { getSocket, disconnectSocket };
