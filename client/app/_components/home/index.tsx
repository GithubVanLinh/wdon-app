import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { ContentCard } from "..";
import { AddPost } from "../content-card/add-post";

import { post } from "./mock-post";
import { useAppSelector } from "@/app/_lib/hook";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  const token = useAppSelector((state) => state.user.token);

  const handleFetchData = useCallback(async () => {
    const response = await axios.get("http://localhost:3001/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("data", response.data);
  }, [token]);

  useEffect(() => {
    console.log("in home");
    console.log("usr", user);
    if (!user.logged) {
      console.log("push to login");
      router.push("/login");
    } else {
      handleFetchData();
    }
  });

  return (
    <main>
      <div className="grid grid-cols-1 p-2 md:grid-cols-4 md:gap-4 md:p-0 lg:grid-cols-3">
        <div className="col-span-1 pl-4"></div>
        <div className="col-span-1 md:col-span-2 lg:col-span-1 grid gap-y-4">
          <AddPost />

          {post.map((p, i) => {
            return (
              <ContentCard key={i} header={p.header}>
                {p.children}
              </ContentCard>
            );
          })}
          <ContentCard
            header={{
              ring: true,
              subTitle: "13:30",
              actionStatus: true,
              title: "wdon",
              avatar:
                "data:image/png;base64,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",
            }}
          >
            <div>Hi everyone, I want to do this. Please support me!</div>
          </ContentCard>
          <ContentCard
            header={{
              ring: false,
              subTitle: "13:31",
              actionStatus: true,
              title: "wdon",
              avatar:
                "data:image/png;base64,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",
            }}
          >
            <div>Hi everyone, I want to do this. Please support me!</div>
          </ContentCard>
        </div>
        <div className="col-span-1 text-right pr-4"></div>
      </div>
    </main>
  );
}
