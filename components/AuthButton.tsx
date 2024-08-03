"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { signUpWithGithub } from "@/lib/server/oauth";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

interface AuthButtonProps {
  user: object | null;
}

export const AuthButton = ({ user }: AuthButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const error = await signUpWithGithub();
      if (!error) {
        toast({
          title: "Successfully logged in.",
          description: "Redirecting to your Dashboard.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Sign-in Error",
          description: "An unexpected error occurred during sign-out:",
        });
      }
    } catch (error) {
      console.error("An unexpected error occurred during sign-in:", error);
      toast({
        variant: "destructive",
        title: "Sign-out Error",
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
          className="gap-4"
        >
          Continue With Github <MoveRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
