import Avatar from "@/components/common/Avatar";
import Container from "@/components/common/Container";
import UserLink from "../UserLink";
import Button from "@/components/common/Button";
import { MouseEventHandler } from "react";

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
}: Readonly<MessageUserBoxProps>) {
  return (
    <button
      onClick={onClicked}
      className={
        "flex flex-row w-full p-4 gap-2 hover:bg-gray-100" +
        (selected ? " bg-gray-200" : " bg-white")
      }
    >
      <Container>
        <Avatar src={avatar} />
      </Container>
      <Container col>
        <Container className="gap-1">
          <h1 className="font-bold">{name}</h1>
          <UserLink text={link} />
          <span className="text-gray-400 hidden 2xl:flex">
            {date.toDateString()}
          </span>
        </Container>
        <Container>
          <p>{lastMessage}</p>
        </Container>
      </Container>
    </button>
  );
}
