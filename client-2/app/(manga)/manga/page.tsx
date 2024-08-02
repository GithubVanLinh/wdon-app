import Image from "next/image";
import Section from "./_components/Section";

export interface PageProps {}

const mockData: { id: string; name: string; url: string }[] = [
  {
    id: "1",
    name: "Hero",
    url: "https://mn1.truyentranhgay.com/ttg/production/1.0.0/hixf2syG_5_s800.webp",
  },
  {
    id: "2",
    name: "Hero",
    url: "https://mn1.truyentranhgay.com/ttg/production/1.0.0/UFxY45UA13_s800.webp",
  },
  {
    id: "3",
    name: "Hero and the most view of the world in this centery scare",
    url: "https://mn1.truyentranhgay.com/ttg/production/1.0.0/hixf2syG_5_s800.webp",
  },
  {
    id: "4",
    name: "Hero",
    url: "https://mn1.truyentranhgay.com/ttg/production/1.0.0/hixf2syG_5_s800.webp",
  },
  {
    id: "5",
    name: "Hero",
    url: "https://mn1.truyentranhgay.com/ttg/production/1.0.0/hixf2syG_5_s800.webp",
  },
  {
    id: "6",
    name: "Hero",
    url: "https://mn1.truyentranhgay.com/ttg/production/1.0.0/hixf2syG_5_s800.webp",
  },
  {
    id: "7",
    name: "Hero",
    url: "https://mn1.truyentranhgay.com/ttg/production/1.0.0/hixf2syG_5_s800.webp",
  },
  {
    id: "8",
    name: "Hero",
    url: "https://mn1.truyentranhgay.com/ttg/production/1.0.0/hixf2syG_5_s800.webp",
  },
  {
    id: "9",
    name: "Hero",
    url: "https://mn1.truyentranhgay.com/ttg/production/1.0.0/hixf2syG_5_s800.webp",
  },
  {
    id: "10",
    name: "Hero",
    url: "https://mn1.truyentranhgay.com/ttg/production/1.0.0/hixf2syG_5_s800.webp",
  },
  {
    id: "11",
    name: "Hero",
    url: "https://mn1.truyentranhgay.com/ttg/production/1.0.0/hixf2syG_5_s800.webp",
  },
];

export default function Page({}: Readonly<PageProps>) {
  return (
    <section className="text-white p-2 flex flex-col items-center">
      <Section link="#" title="Recently Update" data={mockData} />
      <Section link="#" title="Most view" data={mockData} />
    </section>
  );
}
