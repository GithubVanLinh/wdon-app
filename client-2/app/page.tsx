import Link from "next/link";

export default function Home() {
  return (
    <main>
      Home<Link href={"/feed"}>To Feed</Link>
    </main>
  );
}
