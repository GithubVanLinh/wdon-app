import Link from "next/link";

export interface TabProps {
  title: string;
  href: string;
  selected?: boolean;
}

export default function Tab({
  title,
  href,
  selected = false,
}: Readonly<TabProps>) {
  return (
    <div className={"flex grow shrink basis-auto hover:bg-gray-200"}>
      <Link
        href={href}
        replace
        className="w-full h-full flex flex-row justify-center items-center p-2"
      >
        <span className={selected ? "border-b-blue-600 border-b-4" : ""}>
          {title}
        </span>
      </Link>
    </div>
  );
}
