import { Timeline } from "@/components/Timeline";
import { TimelineFeed } from "@/components/TimelineFeed";
// src/app/page.tsx
import type { Yweet } from "@/types/yweet";



// レスポンスは配列そのもの

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function Home() {
  const data = await fetch(url + "/v1/timelines/public");

  // 確認する（ここは Response オブジェクト）
  console.log(data);

  const yweets = (await data.json()) as Yweet[];

  console.log(yweets);
  // ...
  return (
    <>
      <Timeline>
        <TimelineFeed initialYweets={yweets} />
      </Timeline>
    </>
  );
}

