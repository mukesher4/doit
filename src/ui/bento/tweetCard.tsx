"use client"
import { useState, useRef, useCallback } from 'react';
import React from 'react';
import { Heart } from 'lucide-react';

export default function TweetCard() {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(42);
    const [prevCount, setPrevCount] = useState<number | null>(null);
    const [animationState, setAnimationState] = useState<'idle' | 'increment' | 'decrement'>('idle');
    const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const triggerIncrementAnimation = useCallback(() => {
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }

        setAnimationState('increment');

        animationTimeoutRef.current = setTimeout(() => {
            setAnimationState('idle');
            setPrevCount(null);
        }, 250);
    }, []);

    const triggerDecrementAnimation = useCallback(() => {
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }

        setAnimationState('decrement');

        animationTimeoutRef.current = setTimeout(() => {
            setAnimationState('idle');
            setPrevCount(null);
        }, 250);
    }, []);

    const handleLike = () => {
        if (isLiked) {
            setPrevCount(likeCount);
            setLikeCount(likeCount - 1);
            triggerDecrementAnimation();
        } else {
            setPrevCount(likeCount);
            setLikeCount(likeCount + 1);
            triggerIncrementAnimation();
        }
        setIsLiked(!isLiked);
    };

    return (
      <div className="relative h-72 w-[33rem]">
        <div className="
            h-72 
            w-[532px]
            border border-2 border-[#808080]
            bg-[#0D0D0D]
            rounded-[25px]
            outline outline-2 outline-[#4D4D4D]
            outline-offset-4
            bg-[radial-gradient(circle_at_center,#070707_0%,#070707_58%)]
            bg-cover bg-center
            p-4 shadow-lg relative overflow-visible
            z-10
          "
        >
          <div className="h-[60%]">
            <div className="relative top-14">
              <div
                className="
                  absolute
                  inset-x-6    
                  -top-12      
                  z-0          
                  h-24
                  bg-[#000000]
                  border border-white
                  rounded-2xl
                  px-4 py-2
                  shadow-md
                "
              >
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="font-bold text-white/70">Accountability Bot</span>
                  <span className="text-white/40">@Doit · 1m</span>
                </div>
                <div className="mt-1 text-white text-sm">
                  So, <span className="text-blue-400">@TrueG78</span>. Your daily task apparently
                  went on vacation today. Without you. Hope it had fun. Meanwhile, it&apos;s still
                  waiting to be checked off whenever you decide to rejoin reality.
                </div>
              </div>

              {/* Main header */}
              <div
                className="
                  absolute
                  inset-x-4
                  -top-6
                  z-10
                  h-24
                  bg-[#000000]
                  border border-white
                  rounded-2xl
                  px-4 py-2
                  shadow-md
                "
              >
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="font-bold text-white">Accountability Bot</span>
                  <span className="text-gray-500">@Doit · 1m</span>
                </div>
                <div className='flex justify-between items-center'>
                  <div className="mt-1 text-white text-[12px] w-[93%]">
                    So, <span className="text-blue-400">@TrueG78</span>. Your daily task apparently
                    went on vacation today. Without you. Hope it had fun. Meanwhile, it&apos;s still
                    waiting to be checked off whenever you decide to rejoin reality.
                  </div>
                  <div
                    onClick={handleLike}
                    className={`
                      group flex flex-col items-center gap-[2px] cursor-pointer select-none
                      ${isLiked ? 'text-[#f60478]' : ''}
                      relative
                    `}
                  >
                    <div className="relative w-4 h-4 flex items-center justify-center">
                      <Heart
                        className={
                          `w-4 h-4 transition-colors duration-200
                          ${isLiked ? 'fill-[#f60478] text-[#f60478]' : 'fill-none text-white/50 group-hover:text-[#f60478]'}
                          `
                        }
                        fill={isLiked ? '#f60478' : 'none'}
                      />
                    </div>
                    <div className="relative h-[15px] w-3 overflow-hidden flex items-center justify-center">
                      {prevCount !== null && (animationState === 'increment' || animationState === 'decrement') && (
                        <span
                          className={`
                            absolute left-0 right-0 w-full text-[9px] group-hover:text-[#f60478]
                            transition-all duration-300 ease-in-out
                            ${isLiked ? 'text-[#f60478]' : 'text-white/50'}
                            ${animationState === 'increment' ? 'animate-go-up' : 'animate-go-to-up'}
                          `}
                        >
                          {prevCount}
                        </span>
                      )}
                      <span
                        className={`
                          absolute left-0 right-0 w-full text-[9px] group-hover:text-[#f60478]
                          transition-all duration-300 ease-in-out
                          ${isLiked ? 'text-[#f60478]' : 'text-white/50'}
                          ${animationState === 'increment' ? 'animate-come-down' : animationState === 'decrement' ? 'animate-come-to-down' : 'translate-y-0 opacity-100'}
                        `}
                      >
                        {likeCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 pt-4 pb-2">
            <div className="text-3xl font-bold text-white mb-2">Public Accountability</div>
            <div className="text-gray-400 text-[15px]">
              Let the world be your accountability partner. Every task is a public declaration of your commitment to growth. No more excuses, just action.
            </div>
          </div>
        </div>
      </div>
    );
}
