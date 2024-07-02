import Avatar from "@/components/common/Avatar";
import Container from "@/components/common/Container";
import UserLink from "../UserLink";
import Button from "@/components/common/Button";
import { MouseEventHandler } from "react";
import { toLocalDate } from "@/utils/date";

export interface MessageUserBoxProps {
  avatar: string;
  name: string;
  link: string;
  date: Date;
  lastMessage: string;
  selected?: boolean;
  onClicked?: MouseEventHandler<HTMLButtonElement>;
}

export default function MessageUserBox({
  avatar,
  name,
  link,
  date,
  lastMessage,
  selected = false,
  onClicked,
  ...res
}: Readonly<MessageUserBoxProps>) {
  return (
    <button
      {...res}
      onClick={onClicked}
      className={
        "flex flex-row grow shrink basis-0 w-full p-4 gap-2 hover:bg-gray-100" +
        (selected ? " bg-gray-200" : " bg-white")
      }
    >
      <Container>
        <Avatar src={avatar} />
      </Container>
      <Container col className="min-w-0">
        <Container className="gap-1 min-w-0 w-full">
          <div className="flex">
            <h1 className="font-bold">{name}</h1>
          </div>
          <div className="flex grow shrink basis-0 min-w-0">
            <UserLink text={link} />
          </div>
          <div className="hidden 2xl:flex">
            <span className="text-gray-400">
              {toLocalDate(date.toDateString())}
            </span>
          </div>
        </Container>
        <Container>
          <p>{lastMessage}</p>
        </Container>
      </Container>
    </button>
  );
}
