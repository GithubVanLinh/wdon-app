import Avatar from "@/components/common/Avatar";

export interface LogoProps {}

export default function Logo({}: Readonly<LogoProps>) {
  return (
    <Avatar src="https://pbs.twimg.com/media/GOksgkpbEAAoFZ7?format=jpg&name=small" />
  );
}
