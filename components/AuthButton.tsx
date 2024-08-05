"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { signUpWithProvider } from "@/lib/server/oauth";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

interface AuthButtonProps {
  user?: object | null;
  provider: "github" | "discord";
}

export const AuthButton = ({ user, provider }: AuthButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const error = await signUpWithProvider(provider);

      if (!error) {
        if (provider === "github") {
          toast({
            title: "Please Wait...",
            description: "We're logging you in.",
          });
        } else if (provider === "discord") {
          toast({
            title: "Just a min...",
            description: "We're connecting your Discord account.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Sign-in Error",
          description: "An unexpected error occurred during sign-in:",
        });
      }
    } catch (error) {
      console.error("An unexpected error occurred during sign-in:", error);
      toast({
        variant: "destructive",
        title: "Sign-in Error",
        description: "An unexpected error occurred during sign-in.",
      });
    }
  };

  return (
    <div>
      {user ? (
        <Link href="/dashboard">
          <Button size="lg" className="gap-4">
            Go to Dashboard <MoveRight className="w-4 h-4" />
          </Button>
        </Link>
      ) : (
        <Button
          onClick={handleSignIn}
          disabled={loading}
          type="submit"
          size="lg"
          className="gap-4 w-full"
        >
          {provider === "github" ? (
            <>
              Continue With GitHub <MoveRight className="w-4 h-4" />
            </>
          ) : (
            "Connect"
          )}
        </Button>
      )}
    </div>
  );
};
