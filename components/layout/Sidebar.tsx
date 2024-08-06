import { Bell, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/AuthButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserProfile } from "@/lib/db/user";

const Sidebar = async () => {
  const response = await getUserProfile();
  const profile = response.documents[0];

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="">GitIssuefy</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary bg-muted transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4 sticky bottom-2">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              {profile.discord_id ? (
                <>
                  <CardTitle>Connected to Discord</CardTitle>
                  <CardDescription>
                    To ensure you receive notifications, you must first invite
                    GitIssuefy bot to your server.
                  </CardDescription>
                </>
              ) : (
                <>
                  <CardTitle>Connect Your Discord</CardTitle>
                  <CardDescription>
                    Link your Discord account to start receiving notifications
                    about your watched repositories.
                  </CardDescription>
                </>
              )}
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              {profile.discord_id ? (
                <Link
                  href={
                    "https://discord.com/oauth2/authorize?client_id=1269794139570962594&permissions=75776&integration_type=0&scope=bot"
                  }
                >
                  <Button className="w-full">Invite Bot</Button>
                </Link>
              ) : (
                <AuthButton provider="discord" />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
