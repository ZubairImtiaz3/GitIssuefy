import { GitHubLogoIcon, DiscordLogoIcon } from "@radix-ui/react-icons";
import { BotIcon, Tags } from "lucide-react";
import { HoverCard } from "./ui/hover-card";
import Marquee from "./ui/marque";

const features = [
  {
    Icon: GitHubLogoIcon,
    name: "Connect Your GitHub",
    description:
      "Link your GitHub account to sync and manage your watched repositories.",
    href: "#",
    cta: "Connect now",
    className: "col-span-3 lg:col-span-1",
    background: "",
  },
  {
    Icon: DiscordLogoIcon,
    name: "Connect Your Discord",
    description:
      "Integrate your Discord account so we can send notifications at right place.",
    href: "#",
    cta: "Set up integration",
    className: "col-span-3 lg:col-span-2",
    background: "",
  },
  {
    Icon: BotIcon,
    name: "Invite GitIssuefy Bot To Your Server",
    description:
      "Add our bot to your Discord server for automated issue tracking and updates.",
    href: "#",
    cta: "Add bot",
    className: "col-span-3 lg:col-span-2",
    background: "",
  },
  {
    Icon: Tags,
    name: "Track Issues By Label",
    description:
      "Select repositories and specify the issue labels for which you want to receive notifications when new issues arises.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Start tracking",
    background: "",
  },
];

export function HowItWorks() {
  return (
    <div className="mx-auto max-w-6xl gap-4 px-4 pb-28 md:px-0 md:py-20">
      <div className="text-center pb-20">
        <p className="text-lg leading-relaxed text-muted-foreground">
          How it works
        </p>
        <h2 className="text-4xl">Just 4 steps to get started</h2>
      </div>
      <div className="flex relative">
        <Marquee pauseOnHover className="[--duration:20s]">
          {features.map((feature, idx) => (
            <HoverCard key={idx} {...feature} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
      </div>
    </div>
  );
}
