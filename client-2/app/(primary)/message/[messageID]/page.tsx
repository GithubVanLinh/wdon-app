"use client";

import CenteredElement from "@/components/common/CenteredElement";
import ImageButton from "@/components/common/ImageButton";
import List from "@/components/common/List";
import Loading from "@/components/common/Loading";
import LoadingAndError from "@/components/common/LoadingAndError";
import StickyArea from "@/components/common/StickyArea";
import { useProfile } from "@/hooks/useProfile";
import useService from "@/hooks/useService";
import {
  addMessage,
  setCurrent,
  setMessages,
} from "@/lib/feature/message/messageSlice";
import { useAppSelector } from "@/lib/hooks";
import { getListMessageFromConversation } from "@/services/conversation";
import { sendMessage } from "@/services/messageService";
import { Message } from "@/utils/type/conversation";
import {
  FaceSmileIcon,
  GifIcon,
  PaperAirplaneIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import "./style.css";

export interface PageProps {
  params: {
    messageID: string;
  };
}

export default function Page({ params: { messageID } }: Readonly<PageProps>) {
  const profileId = useAppSelector((state) => state.auth.profile?._id);
  const messages = useAppSelector((state) => state.message);
  const messageShow: Message[] = messages.data[messageID]
    ? JSON.parse(JSON.stringify(messages.data[messageID]))
    : [];
  const [messageInput, setMessageInput] = useState("");
  const dispatch = useDispatch();
  // const curMessage = messages.data[messageID];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const scrollToBottom = () => {
    console.log("scrollToBottom");
    const element = document.querySelector("#list-message");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };
  useEffect(() => {
    if (!messages.data[messageID]) {
      setLoading(true);
      const fetch = async () => {
        const messagesData = await getListMessageFromConversation(messageID);
        dispatch(setMessages({ key: messageID, messages: messagesData }));
        setLoading(false);
      };
      fetch().finally(() => {
        scrollToBottom();
      });
    } else {
      setLoading(false);
    }
  }, [messageID, dispatch, messages.data]);

  useEffect(() => {
    dispatch(setCurrent(messageID));
  }, [dispatch, messageID]);

  const autoResize = (e: FormEvent<HTMLTextAreaElement>) => {
    e.currentTarget.style.height = "5px";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };
  const onSubmit = async () => {
    const res = await sendMessage(messageID, messageInput);
    scrollToBottom();
    // dispatch(addMessage({ key: messageID, message: res }));
  };
  const onPostSubmit = () => {
    setMessageInput("");
  };
  const onFormSubmit = () => {
    onSubmit();
    onPostSubmit();
  };
  return (
    <div
      id="list-message"
      className="bg-slate-100 overflow-y-auto h-screen flex flex-col justify-between pt-4 w-full "
    >
      <LoadingAndError
        error={error}
        loading={loading}
        data={messageShow}
        transform={(data) =>
          data.map((d, index, arr): any => {
            d.show = true;
            const next = arr[index + 1];
            if (next) {
              const date = new Date(d.createdAt);
              const nextDate = new Date(next.createdAt);
              if (nextDate.getTime() - date.getTime() < 60 * 60 * 1000) {
                d.show = false;
              }
            }
          })
        }
      >
        {!loading && messageShow.length === 0 ? (
          <CenteredElement>You have no messages!</CenteredElement>
        ) : (
          <List
            className="flex flex-col gap-1 px-4"
            list={messageShow}
            item={(it, next) => (
              <div
                key={it._id}
                className={
                  "flex flex-col " +
                  (it.from === profileId ? "items-end" : "items-start")
                }
              >
                <p
                  className={
                    "wrap-any max-w-7/10 rounded-t-3xl flex flex-row p-2" +
                    (it.from === profileId
                      ? " bg-blue-400 text-right items-end rounded-bl-3xl text-white"
                      : " bg-white text-left items-start rounded-br-3xl")
                  }
                >
                  {it.message}
                </p>
                {it.show && (
                  <span className="text-xs text-gray-400">
                    {new Date(it.createdAt).toLocaleTimeString() +
                      " " +
                      new Date(it.createdAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            )}
          />
        )}
      </LoadingAndError>
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
  );
}
