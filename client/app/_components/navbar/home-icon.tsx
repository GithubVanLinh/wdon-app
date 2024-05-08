import Image from "next/image";
import { Button } from "..";

import "./style.css";
import { useAppDispatch } from "@/app/_lib/hook";
import { chooseHome } from "@/app/_lib/features/home/dashboard";
import { HOME_PAGE_TARGET, TARGET_PAGE } from "./const";

export type HomeIconOptions = {
  choose?: boolean;
};

export function HomeIcon({ choose = false }: HomeIconOptions) {
  const dispatcher = useAppDispatch();

  const handleButtonOnclick = () => {
    localStorage.setItem(TARGET_PAGE, HOME_PAGE_TARGET);
    dispatcher(chooseHome());
  };

  return (
    <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
      <Button
        type="button"
        className="block py-2 px-3 text-white bg-blue-700 rounded
      md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
        onClick={handleButtonOnclick}
      >
        <Image
          alt="home icon"
          src={choose ? "/home_fill.svg" : "/home.svg"}
          width={30}
          height={30}
          className={choose ? "filter-blue" : ""}
        />
      </Button>
    </li>
  );
}
