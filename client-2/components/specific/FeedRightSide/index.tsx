import List from "@/components/common/List";
import RounedArea from "@/components/common/RoundedArea";
import { DivProps } from "@/utils/type/html";
import HashtagItem from "../HashtagItem";

export interface FeedRightSideProps {}

export default function FeedRightSide({
  ...res
}: Readonly<FeedRightSideProps & DivProps>) {
  return (
    <div {...res}>
      <div className="gap-4 flex flex-col">
        <div className="sticky top-0 flex">
          <input className="border"></input>
        </div>

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
              { top: "haha", mid: "ok", bot: "hmm" },
              { top: "haha", mid: "ok", bot: "hmm" },
              { top: "haha", mid: "ok", bot: "hmm" },
              { top: "haha", mid: "ok", bot: "hmm" },
              { top: "haha", mid: "ok", bot: "hmm" },
              { top: "haha", mid: "ok", bot: "hmm" },
              { top: "haha", mid: "ok", bot: "hmm" },
              { top: "haha", mid: "ok", bot: "hmm" },
              { top: "haha", mid: "ok", bot: "hmm" },
              { top: "haha", mid: "ok", bot: "hmm" },
            ]}
            item={(it) => (
              <HashtagItem category={it.top} name={it.mid} num={it.bot} />
            )}
          />
        </RounedArea>
      </div>
    </div>
  );
}
