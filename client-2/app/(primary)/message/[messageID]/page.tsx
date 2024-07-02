"use client";

import CenteredElement from "@/components/common/CenteredElement";
import ImageButton from "@/components/common/ImageButton";
import List from "@/components/common/List";
import Loading from "@/components/common/Loading";
import LoadingAndError from "@/components/common/LoadingAndError";
import StickyArea from "@/components/common/StickyArea";
import useService from "@/hooks/useService";
import { setCurrent } from "@/lib/feature/message/messageSlice";
import { useAppSelector } from "@/lib/hooks";
import { getListMessageFromConversation } from "@/services/conversation";
import {
  FaceSmileIcon,
  GifIcon,
  PaperAirplaneIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export interface PageProps {
  params: {
    messageID: string;
  };
}

export default function Page({ params: { messageID } }: Readonly<PageProps>) {
  const messages = useAppSelector((state) => state.message);
  const [messageInput, setMessageInput] = useState("");
  const dispatch = useDispatch();
  const curMessage = messages.data[messageID];

  const { data, error, loading } = useService(
    getListMessageFromConversation,
    messageID
  );

  useEffect(() => {
    dispatch(setCurrent(messageID));
  }, [dispatch, messageID]);

  const autoResize = (e: FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "5px";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };
  const onSubmit = () => {
    console.log(data);
  };
  const onPostSubmit = () => {
    console.log("after submit");
  };
  const onFormSubmit = () => {
    onSubmit();
    onPostSubmit();
  };
  // if (loading) {
  //   return <Loading />;
  // }

  // if (error) {
  //   return <div>Something went wrongs</div>;
  // }

  // if (!data) {
  //   return;
  // }

  return (
    <LoadingAndError error={error} loading={loading}>
      <div className="container bg-slate-100 overflow-y-auto h-screen flex flex-col justify-between pt-4">
        {data.length === 0 ? (
          <CenteredElement>You have no messages!</CenteredElement>
        ) : (
          <List
            className="flex flex-col gap-1 px-4"
            list={data}
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
                  {new Date(it.createdAt).toLocaleTimeString() +
                    " " +
                    new Date(it.createdAt).toLocaleDateString()}
                </span>
              </div>
            )}
          />
        )}

        <StickyArea className="bottom-0 left-0 p-2 bg-slate-100">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onFormSubmit();
            }}
            className=" bg-slate-200 p-2 rounded-lg flex flex-row justify-between items-center"
          >
            <div className="flex flex-row text-blue-600">
              <ImageButton image={<PhotoIcon height={24} width={24} />} />
              <ImageButton image={<GifIcon height={24} width={24} />} />
              <ImageButton image={<FaceSmileIcon height={24} width={24} />} />
            </div>
            <div className="flex flex-grow">
              <textarea
                value={messageInput}
                onKeyDown={(e) => {
                  if (e.key == "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onFormSubmit();
                  }
                }}
                name="text"
                onInput={(e) => {
                  autoResize(e);
                  setMessageInput(e.currentTarget.value);
                }}
                placeholder="Write new message..."
                rows={1}
                className="bg-inherit outline-none w-full resize-none overflow-hidden min-h-full max-h-40"
              ></textarea>
            </div>
            <div className="text-blue-600">
              <button
                type="submit"
                className="rounded-full hover:bg-gray-300 p-2"
              >
                <PaperAirplaneIcon height={24} width={24} />
              </button>
            </div>
          </form>
        </StickyArea>
      </div>
    </LoadingAndError>
  );
}
