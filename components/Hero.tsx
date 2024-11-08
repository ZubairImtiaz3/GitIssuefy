import { Compass, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Ripple from "@/components/ui/ripple";
import HomeAuthBtn from "@/components/HomeAuth";
import { Suspense } from "react";
import { SkeletonButton } from "@/app/(dashboard)/dashboard/loading";
import HeroVideo from "@/components/HeroVideo";
import Link from "next/link";

export const Hero = () => {
  return (
    <>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Ripple />

        <div className="container mx-auto z-40">
          <div className="flex gap-8 py-36 lg:py-28 items-center justify-center flex-col">
            <Link
              target="_blank"
              href={"https://zubair-imtiaz.vercel.app/blog/01-gitissuefy"}
            >
              <Button
                data-umami-event="Read Blog"
                variant="secondary"
                size="sm"
                className="gap-4"
              >
                Read our launch article <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                Stay Updated, Contribute Faster
              </h1>
              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                Connect your GitHub and Discord to track your favorite
                open-source projects. Get notified only when new issues arise
                with your chosen labels, so you can be the first to contribute
                and make a difference.
              </p>
            </div>
            <div className="flex flex-row gap-3 flex-wrap-reverse justify-center items-center">
              <a href="#demo">
                <Button size="lg" className="gap-4" variant="outline">
                  Learn More <Compass className="h-[18px] w-[18px]" />
                </Button>
              </a>
              <Suspense fallback={<SkeletonButton />}>
                <HomeAuthBtn />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <HeroVideo />
    </>
  );
};
