import List from "@/components/common/List";
import RounedArea from "@/components/common/RoundedArea";
import { DivProps } from "@/utils/type/html";
import HashtagItem from "../HashtagItem";
import StickyArea from "@/components/common/StickyArea";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export interface FeedRightSideProps {}

export default function FeedRightSide({
  ...res
}: Readonly<FeedRightSideProps & DivProps>) {
  return (
    <div {...res}>
      <div className="gap-4 flex flex-col">
        <StickyArea className="w-full p-2">
          <div className="flex justify-start items-center">
            <input className="peer bg-gray-200 pl-10 w-full p-2 outline-blue-600 rounded-full pr-4"></input>
            <div className="absolute p-2 peer-focus:text-blue-600">
              <MagnifyingGlassIcon width={20} height={20} />
            </div>
          </div>
        </StickyArea>

        <RounedArea className="p-2 flex flex-col bg-white items-start gap-2">
          <h1 className="text-xl">
            <b>Đăng ký gói Premium</b>
          </h1>
          <p className="text-sm">
            Đăng ký để mở khóa các tính năng mới và nếu đủ điều kiện, bạn sẽ
            được nhận một khoản chia sẻ doanh thu từ quảng cáo.
          </p>
          <button className="bg-black text-white p-2 rounded-full">
            Register
          </button>
        </RounedArea>

        <RounedArea className="bg-white gap-2 divide-y">
          <div>
            <h1 className="font-bold text-xl p-2">Xu hướng cho bạn</h1>
          </div>
          <List
            className="divide-y"
            list={[
              { top: "haha", mid: "ok1", bot: "hmm" },
              { top: "haha", mid: "ok2", bot: "hmm" },
              { top: "haha", mid: "ok3", bot: "hmm" },
              { top: "haha", mid: "ok4", bot: "hmm" },
              { top: "haha", mid: "ok5", bot: "hmm" },
              { top: "haha", mid: "ok6", bot: "hmm" },
              { top: "haha", mid: "ok7", bot: "hmm" },
              { top: "haha", mid: "ok8", bot: "hmm" },
              { top: "haha", mid: "ok9", bot: "hmm" },
              { top: "haha", mid: "ok0", bot: "hmm" },
            ]}
            item={(it) => (
              <HashtagItem
                key={it.mid}
                category={it.top}
                name={it.mid}
                num={it.bot}
              />
            )}
          />
        </RounedArea>
      </div>
    </div>
  );
}
