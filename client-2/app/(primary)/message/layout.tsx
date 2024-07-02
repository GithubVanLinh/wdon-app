"use client";

import List from "@/components/common/List";
import Loading from "@/components/common/Loading";
import StickyArea from "@/components/common/StickyArea";
import MessageUserBox from "@/components/specific/MessageUserBox";
import useService from "@/hooks/useService";
import { setCurrent } from "@/lib/feature/message/messageSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getListConversation } from "@/services/conversation";
import { Cog8ToothIcon, PlusIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export interface PageProps {
  children: ReactNode;
}

export default function Page({ children }: Readonly<PageProps>) {
  const current = useAppSelector((state) => state.message.current);

  const { data, loading, error } = useService(getListConversation, null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {});

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Something went wrongs: {error.message}</div>;
  }

  if (data) {
    console.log(data);
    return (
      <div className="w-full h-full overflow-hidden flex flex-row">
        <div className="flex grow shrink basis-0 flex-col h-screen border-l divide-y overflow-y-scroll">
          <StickyArea className="flex flex-row justify-between p-4 bg-white">
            <div className="flex">
              <h1 className="text-lg font-bold">Messages</h1>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-row gap-2">
                <span>
                  <Cog8ToothIcon height={20} width={20} />
                </span>
                <span>
                  <PlusIcon height={20} width={20} />
                </span>
              </div>
            </div>
          </StickyArea>
          <List
            className="divide-y"
            list={data}
            item={(it) => (
              <MessageUserBox
                onClicked={() => {
                  dispatch(setCurrent(it._id));
                  router.replace("/message/" + it._id);
                }}
                selected={current === it._id}
                avatar={
                  "https://pbs.twimg.com/media/GRT9tUiacAA34Ey?format=jpg&name=large"
                }
                date={new Date(it.updatedAt)}
                lastMessage={"nothing"}
                link={it._id}
                name={it.participants.name}
                key={it._id}
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
}
