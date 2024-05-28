import { DivProps } from "@/utils/type/html";
import Logo from "../Logo";
import ImageButton from "@/components/common/ImageButton";
import {
  BellIcon,
  CubeIcon,
  EllipsisHorizontalIcon,
  EnvelopeIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

export interface FeedLeftSideProps {}

export default function FeedLeftSide({
  ...res
}: Readonly<FeedLeftSideProps & DivProps>) {
  return (
    <div {...res}>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <div className="p-2 flex">
            <Logo />
          </div>
          <ImageButton
            text="Home"
            image={<HomeIcon width={30} height={30} />}
          />
          <ImageButton
            text="Search"
            image={<MagnifyingGlassIcon width={30} height={30} />}
          />
          <ImageButton
            text="Notifications"
            image={<BellIcon width={30} height={30} />}
          />
          <ImageButton
            text="Message"
            image={<EnvelopeIcon width={30} height={30} />}
          />
          <ImageButton
            text="Cube"
            image={<CubeIcon width={30} height={30} />}
          />
          <ImageButton
            text="Communications"
            image={<UserGroupIcon width={30} height={30} />}
          />
          <ImageButton
            text="Premium"
            image={<XMarkIcon width={30} height={30} />}
          />
          <ImageButton
            text="Profile"
            image={<UserIcon width={30} height={30} />}
          />
          <ImageButton
            text="More"
            image={<EllipsisHorizontalIcon width={30} height={30} />}
          />
        </div>
        <div className="flex flex-col"></div>
      </div>
    </div>
  );
}
