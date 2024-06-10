"use client";

import List from "@/components/common/List";
import StickyArea from "@/components/common/StickyArea";
import MessageUserBox from "@/components/specific/MessageUserBox";
import { setCurrent } from "@/lib/feature/message/messageSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: Readonly<PageProps>) {
  const current = useAppSelector((state) => state.message.current);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {});
  return (
    <div className="w-full h-full overflow-hidden flex flex-row">
      <div className="flex grow shrink basis-0 flex-col h-screen overflow-y-auto border-l divide-y">
        <StickyArea className="flex flex-row justify-between p-4 bg-white">
          <div className="flex">
            <h1 className="text-lg font-bold">Messages</h1>
          </div>
          <div className="flex flex-row">
            <div className="">
              <span>Action</span>
              <span>Action</span>
            </div>
          </div>
        </StickyArea>
        <List
          className="divide-y"
          list={[
            {
              avatar:
                "https://pbs.twimg.com/media/GPFjR6naMAAbcaZ?format=jpg&name=large",
              name: "Abc",
              link: "XYZ",
              date: new Date(),
              lastMessage: "What?",
            },
            {
              avatar:
                "https://pbs.twimg.com/media/GPFjR6naMAAbcaZ?format=jpg&name=large",
              name: "Abc",
              link: "XYZm",
              date: new Date(),
              lastMessage: "What?",
            },
            {
              avatar:
                "https://pbs.twimg.com/media/GPFjR6naMAAbcaZ?format=jpg&name=large",
              name: "Abc",
              link: "XYZm1",
              date: new Date(),
              lastMessage: "What?",
            },
            {
              avatar:
                "https://pbs.twimg.com/media/GPFjR6naMAAbcaZ?format=jpg&name=large",
              name: "Abc",
              link: "XYZm2",
              date: new Date(),
              lastMessage: "What?",
            },
            {
              avatar:
                "https://pbs.twimg.com/media/GPFjR6naMAAbcaZ?format=jpg&name=large",
              name: "Abc",
              link: "XYZm3",
              date: new Date(),
              lastMessage: "What?",
            },
            {
              avatar:
                "https://pbs.twimg.com/media/GPFjR6naMAAbcaZ?format=jpg&name=large",
              name: "Abc",
              link: "XYZm4",
              date: new Date(),
              lastMessage: "What?",
            },
            {
              avatar:
                "https://pbs.twimg.com/media/GPFjR6naMAAbcaZ?format=jpg&name=large",
              name: "Abc",
              link: "XYZm5",
              date: new Date(),
              lastMessage: "What?",
            },
            {
              avatar:
                "https://pbs.twimg.com/media/GPFjR6naMAAbcaZ?format=jpg&name=large",
              name: "Abc",
              link: "XYZm6",
              date: new Date(),
              lastMessage: "What?",
            },
            {
              avatar:
                "https://pbs.twimg.com/media/GPFjR6naMAAbcaZ?format=jpg&name=large",
              name: "Abc",
              link: "XYZm7",
              date: new Date(),
              lastMessage: "What?",
            },
            {
              avatar:
                "https://pbs.twimg.com/media/GPFjR6naMAAbcaZ?format=jpg&name=large",
              name: "Abc",
              link: "XYZm8",
              date: new Date(),
              lastMessage: "What?",
            },
          ]}
          item={(it) => (
            <MessageUserBox
              onClicked={() => {
                dispatch(setCurrent(it.link));
                router.replace("/message/" + it.link);
              }}
              selected={current === it.link}
              avatar={it.avatar}
              date={it.date}
              lastMessage={it.lastMessage}
              link={it.link}
              name={it.name}
              key={it.link}
            />
          )}
        />
      </div>
      <div className="flex grow-2 shrink basis-0 h-full bg-gray-100">
        {children}
      </div>
    </div>
  );
}
