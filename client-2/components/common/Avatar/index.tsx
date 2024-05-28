import Image from "next/image";

export interface AvatarProps {
  src: string;
}

export default function Avatar({ src }: Readonly<AvatarProps>) {
  return (
    <div className="rounded-full object-fit flex grow-0 overflow-hidden shrink-0 basis-auto w-10 h-10">
      <Image alt="avatar w-full h-full" width={40} height={40} src={src} />
    </div>
  );
}
