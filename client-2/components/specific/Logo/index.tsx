import Avatar from "@/components/common/Avatar";

export interface LogoProps {}

export default function Logo({}: Readonly<LogoProps>) {
  return (
    <Avatar
      size="large"
      ring
      src="http://localhost:3001/uploads/default/logo.jpg"
    />
  );
}
