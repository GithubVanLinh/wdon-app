"use client";

import EndlessList from "@/components/common/EndlessList";
import Loading from "@/components/common/Loading";
import PostCard from "@/components/specific/PostCard";
import useService from "@/hooks/useService";
import { getPosts } from "@/services/postService";
import { useRouter } from "next/navigation";

export interface PageProps {
  params: {
    profileId: string;
  };
}

export default function Page({ params: { profileId } }: Readonly<PageProps>) {
  const router = useRouter();
  const { data, error, loading } = useService(getPosts, profileId);

  if (error) {
    return <div className="text-red-600">{error.message}</div>;
  }

  if (loading) {
    return <Loading />;
  }

  if (data) {
    return (
      <EndlessList
        data={data}
        item={(item) => (
          <PostCard
            onClick={() => {
              router.push(`/${item.profile._id}/status/${item._id}`);
            }}
            post={item}
            key={item._id}
          />
        )}
      />
    );
  }
}
