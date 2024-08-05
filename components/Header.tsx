"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Github } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-background">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-2 items-center">
        <div className="flex">
          <p className="font-semibold">GITISSUEFY</p>
        </div>
        <div className="flex justify-end w-full gap-4">
          <div className="flex items-center justify-center space-x-4">
            <a
              className="text-gray-700"
              href="https://twitter.com/ZubairImtiaz1"
              target="_blank"
            >
              <Icons.twitter className="h-[1.2rem] w-[1.2rem]" />
            </a>
            <a
              className="text-gray-700"
              target="_blank"
              href="https://www.linkedin.com/in/zubair9395/"
            >
              <Icons.linkedin className="h-[1.55rem] w-[1.55rem]" />
            </a>
            <a
              className="text-gray-700"
              target="_blank"
              href="https://github.com/ZubairImtiaz3"
            >
              <Icons.gitHub className="h-6 w-6" />
            </a>
          </div>
          <div className="border-r hidden md:inline"></div>
          <Link
            href={"https://github.com/ZubairImtiaz3/GitIssuefy"}
            target="_blank"
          >
            <Button className="hidden sm:block">
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
