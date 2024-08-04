import { Compass, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { AuthButton } from "@/components/AuthButton";
import { getLoggedInUser } from "@/lib/db/user";

export const Hero = async () => {
  const user = await getLoggedInUser();

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-28 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              Read our launch article <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              This is the start of something new
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our
              goal is to streamline SMB trade, making it easier and faster than
              ever.
            </p>
          </div>
          <div className="flex flex-row gap-3 flex-wrap-reverse justify-center items-center">
            <Button size="lg" className="gap-4" variant="outline">
              Explore Features <Compass className="h-[18px] w-[18px]" />
            </Button>
            <AuthButton user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};
