"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Github } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-[93%] z-50 fixed top-4 left-1/2 transform -translate-x-1/2 bg-primary/20 backdrop-blur-md rounded-full sm:relative sm:bg-white/5 sm:rounded-none sm:top-0 sm:w-full">
      <div className="container mx-auto min-h-14 sm:min-h-20 flex items-center">
        <p className="font-semibold">GITISSUEFY</p>
        <div className="flex justify-end w-full gap-4">
          <div className="flex items-center justify-center space-x-4">
            <a
              className="text-primary"
              href="https://twitter.com/ZubairImtiaz1"
              target="_blank"
              data-umami-event="Twitter Profile"
            >
              <Icons.twitter className="h-[1.2rem] w-[1.2rem]" />
            </a>
            <a
              className="text-primary"
              target="_blank"
              href="https://www.linkedin.com/in/zubair9395/"
              data-umami-event="Linkedin Profile"
            >
              <Icons.linkedin className="h-[1.55rem] w-[1.55rem]" />
            </a>
            <a
              className="text-primary"
              target="_blank"
              href="https://github.com/ZubairImtiaz3"
              data-umami-event="Github Profile"
            >
              <Icons.gitHub className="h-6 w-6" />
            </a>
          </div>
          <div className="border-r hidden md:inline"></div>
          <Link
            href={"https://github.com/ZubairImtiaz3/GitIssuefy"}
            target="_blank"
          >
            <Button data-umami-event="GitHub Star" className="hidden sm:block">
              <span className="flex gap-2">
                Star on Github <Github className="h-5 w-5" />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
