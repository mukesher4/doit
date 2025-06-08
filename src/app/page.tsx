import { Briefcase } from 'lucide-react';
import Card from '@/ui/card';
import GroupIcon from '@/ui/icons/groupIcon';
import LogInCard from '@/ui/bento/logInCard';
import TweetCard from '@/ui/bento/tweetCard';
import TreeCard from '@/ui/treeCard';
import TextOutline from '@/ui/bento/components/textOutline';

export default function Home() {

  return (
    <div className="
      items-center
      h-screen min-h-screen
      
      flex flex-row gap-5
      justify-center justify-items-center
      
      font-[family-name:var(--font-geist-sans)]
      "
    >
      <div
      className='
        flex gap-5
        relative
      '>
        <TextOutline
          width={1050}
          height={630}
          animationDuration="30s"
          fill="rgba(255, 255, 255, 0.4)"
          offsetX={0}
          offsetY={0}
        />

        <div
        className='
          relative
          z-10
          flex gap-5
        '>
          <div className='flex flex-col gap-5 flex-1'>
            <TweetCard />
            <div className="flex gap-5">
                <Card
                title="Passionate Accountability Partners"
                description="Users throughout X waiting for your downfall to happen, can it get any better?"
                icon={
                  <GroupIcon mainColor="#fff" secondaryColor="#888" size={130} strokeWidth={2.5} />
                } />

                <Card
                title="Get work done like never before"
                description="Track your progress, share your journey, and watch your goals become reality."
                icon={
                  <Briefcase size={110} strokeWidth={0.5}/>
                } />
              </div>
          </div>

          <div className='flex flex-1 flex-col gap-5 justify-between'>
            <TreeCard className='w-full' />
            <LogInCard className='w-full h-full' />
          </div>
        </div>
      </div>
    </div>
  );
}