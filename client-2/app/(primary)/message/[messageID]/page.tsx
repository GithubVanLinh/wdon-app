"use client";

import List from "@/components/common/List";
import StickyArea from "@/components/common/StickyArea";
import { setCurrent } from "@/lib/feature/message/messageSlice";
import { useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export interface PageProps {
  params: {
    messageID: string;
  };
}

export default function Page({ params: { messageID } }: Readonly<PageProps>) {
  const messages = useAppSelector((state) => state.message);
  const dispatch = useDispatch();
  const curMessage = messages.data[messageID];
  useEffect(() => {
    dispatch(setCurrent(messageID));
  }, [dispatch, messageID]);
  return (
    <div className="container bg-slate-100 overflow-y-auto h-screen flex flex-col justify-between pt-4">
      <List
        className="flex flex-col gap-1 px-2"
        list={[
          {
            from: "you",
            to: "other",
            message:
              "The collapsed code gets lengthened to the first example in the question. May as well just do it the way it is in the question.",
          },
          {
            from: "you",
            to: "other",
            message:
              "The collapsed code gets lengthened to the first example in the question. May as well just do it the way it is in the question.",
          },
          {
            from: "you",
            to: "other",
            message:
              "The collapsed code gets lengthened to the first example in the question. May as well just do it the way it is in the question.",
          },
          {
            from: "you",
            to: "other",
            message:
              "The collapsed code gets lengthened to the first example in the question. May as well just do it the way it is in the question.",
          },
          {
            from: "you",
            to: "other",
            message:
              "The collapsed code gets lengthened to the first example in the question. May as well just do it the way it is in the question.",
          },
          {
            from: "you",
            to: "other",
            message:
              "The collapsed code gets lengthened to the first example in the question. May as well just do it the way it is in the question.",
          },
          { from: "you", to: "other", message: "HI" },
          { from: "other", to: "you", message: "HI" },
          { from: "other", to: "you", message: "HI" },
          { from: "you", to: "other", message: "HI" },
        ]}
        item={(it) => (
          <div
            className={
              "flex flex-col " +
              (it.from === "you" ? "items-end" : "items-start")
            }
          >
            <p
              className={
                "max-w-7/10 rounded-t-3xl flex flex-row p-2" +
                (it.from === "you"
                  ? " bg-blue-400 text-right items-end rounded-bl-3xl"
                  : " bg-white text-left items-start rounded-br-3xl")
              }
            >
              {it.message}
            </p>
            <span className="text-xs text-gray-400">
              {new Date().toLocaleTimeString() +
                " " +
                new Date().toLocaleDateString()}
            </span>
          </div>
        )}
      />
      <StickyArea className="bottom-0 left-0 p-2 bg-slate-100">
        <div className=" bg-slate-200 p-2 rounded-lg">Abv</div>
      </StickyArea>
    </div>
  );
}
