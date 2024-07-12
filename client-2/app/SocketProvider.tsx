"use client";

import {
  connectedSocket,
  disconnectedSocket,
} from "@/lib/feature/app/appSlice";
import { addMessage } from "@/lib/feature/message/messageSlice";
import { useAppDispatch } from "@/lib/hooks";
import { getSocket } from "@/socket";
import { Message } from "@/utils/type/conversation";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { whiteList } from "./AuthProvider";

export interface SocketProviderProps {
  children: ReactNode;
}

export default function SocketProvider({
  children,
}: Readonly<SocketProviderProps>) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  useEffect(() => {
    // console.log("socket");

    if (whiteList.includes(pathname)) {
      return;
    }
    function onConnect() {
      console.log("connected socket");
      dispatch(connectedSocket());
    }

    function onDisconnect() {
      console.log("disconnected socket");
      dispatch(disconnectedSocket());
    }

    function onMessage(value: Message) {
      // setFooEvents((previous) => [...previous, value]);
      dispatch(addMessage({ key: value.conversation, message: value }));
    }

    const socket = getSocket();
    if (socket) {
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      socket.on("new-message", onMessage);

      return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("new-message", onMessage);
      };
    }
  }, [dispatch, pathname]);
  return children;
}
