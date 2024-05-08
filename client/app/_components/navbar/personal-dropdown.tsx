import { useAppDispatch, useAppSelector } from "@/app/_lib/hook";
import {
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Key } from "react";

export function PersonalDropdown() {
  const dispatcher = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const avatar = useAppSelector((state) => state.user.avatar);
  console.log("user", avatar);
  const router = useRouter();

  function handleLogoutClicked() {
    localStorage.clear();
    router.replace("/login");
  }

  function handleSettingClicked() {}

  function handleProfileClicked() {}

  function onDropdownAction(key: Key) {
    switch (key) {
      case "profile":
        handleProfileClicked();
        return;
      case "setting":
        handleSettingClicked();
        return;
      case "logout":
        handleLogoutClicked();
        return;
      default:
        return;
    }
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          src={user.avatar}
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Actions"
        variant="flat"
        onAction={onDropdownAction}
      >
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">zoey@example.com</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
