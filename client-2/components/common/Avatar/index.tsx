import Image from "next/image";

type Size<key extends string> = {
  [k in key]: {
    size: number;
    className: string;
  };
};
const sizeObj: Size<"large" | "medium" | "small"> = {
  large: {
    size: 48,
    className: "w-12 h-12",
  },
  medium: {
    size: 40,
    className: "w-10 h-10",
  },
  small: {
    size: 32,
    className: "w-8 h-8",
  },
};

export interface AvatarProps {
  src: string;
  ring?: boolean;
  size?: keyof typeof sizeObj;
}

export default function Avatar({
  src,
  ring = false,
  size = "medium",
}: Readonly<AvatarProps>) {
  const width = sizeObj[size].size;
  const className = [
    "rounded-full object-fit flex grow-0 overflow-hidden shrink-0 basis-auto",
    sizeObj[size].className,
  ];
  if (ring) {
    className.push("ring-1");
  }
  return (
    <div className={className.join(" ")}>
      <Image
        alt="avatar w-full h-full"
        width={width}
        height={width}
        src={src}
      />
    </div>
  );
}
