import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";

export type ChooseScopeType = "anyone" | "friend" | "only";

export interface IChooseScopeProperties {
  readonly onSelectedScope?: (value: ChooseScopeType) => void;
}

export function ChooseScope({ onSelectedScope }: IChooseScopeProperties) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["anyone"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="flex flex-rows h-5">
          <div>{selectedValue}</div>
          <Image src={"/down.svg"} alt="down" width={15} height={15} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={(key) => {
          console.log(key);
          if (key !== "all") {
            console.log(key);
            setSelectedKeys(key as Set<string>);
            if (onSelectedScope)
              onSelectedScope(Array.from(key)[0] as ChooseScopeType);
          }
        }}
      >
        <DropdownItem key="anyone">Anyone</DropdownItem>
        <DropdownItem key="friend">Friend</DropdownItem>
        <DropdownItem key="only">Only You</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
