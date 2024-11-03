"use client";

import Image from "next/image";
import Section from "./_components/Section";
import useService from "@/hooks/useService";
import { getListManga } from "@/services/mangaService";
import Loading from "@/components/common/Loading";

export interface PageProps {}

export default function Page({}: Readonly<PageProps>) {
  const { data, error, loading } = useService(getListManga, 1);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-400">{error.message}</div>;
  }

  if (data)
    return (
      <section className="text-white p-2 flex flex-col items-center">
        <Section link="#" title="Recently Update" data={data.data} />
        <Section link="#" title="Most view" data={data.data} />
      </section>
    );
}
