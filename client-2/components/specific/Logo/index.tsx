import Avatar from "@/components/common/Avatar";

export interface LogoProps {}

export default function Logo({}: Readonly<LogoProps>) {
  return <Avatar src="http://localhost:3001/uploads/favicon.ico" />;
}
