import Link from "next/link";
import "./style.css";
import Image from "next/image";

export function AppIcon() {
  return (
    <Link
      href="/"
      className="flex items-center font-semibold text-gray-900 dark:text-white justify-center"
    >
      <div className="flex border-2 justify-center items-center border-rounded">
        <Image src="/app-icon.png" alt="app-icon" height={40} width={40} />
      </div>
    </Link>
  );
}
