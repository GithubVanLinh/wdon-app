export interface UserLinkProps {
  text: string;
}

export default function UserLink({ text }: Readonly<UserLinkProps>) {
  return <div className="text-gray-400 truncate min-w-0">@{text}</div>;
}
