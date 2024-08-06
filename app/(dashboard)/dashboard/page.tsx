import { WatchRepoTable } from "@/components/tables/repository-table/watch-repo-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddRepositoryModal from "@/components/AddRepoModal";
import { userDashboard, getUserIdentity, getUserProfile } from "@/lib/db/user";

export default async function Dashboard() {
  const [identity, profile, dashboard] = await Promise.all([
    getUserIdentity("github"),
    getUserProfile(),
    userDashboard(),
  ]);

  const providerToken = identity?.providerAccessToken;
  const discordId = profile?.documents[0].discord_id;

  return (
    <>
      <div className="flex gap-4 flex-wrap">
        <Card className="sm:col-span-2 grow xl:grow-0">
          <CardHeader className="pb-3">
            <CardTitle>Track Issues</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              {!discordId && <b>Connect your discord.&nbsp;</b>}Stay informed on
              your favorite open-source projects by watching repositories issues
              with your labels of interest.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <AddRepositoryModal
              githubAuthToken={providerToken}
              discordId={discordId}
            />
          </CardFooter>
        </Card>

        <div className="flex gap-4 grow">
          <Card className="grow">
            <CardHeader className="pb-2">
              <CardDescription>Watched Repositories</CardDescription>
              <CardTitle className="text-4xl">
                {dashboard?.totalRepos}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +3 new this week
              </div>
            </CardContent>
          </Card>

          <Card className="grow">
            <CardHeader className="pb-2">
              <CardDescription>Issues Notified</CardDescription>
              <CardTitle className="text-4xl">
                {dashboard?.totalNotifications}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +10% from last month
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <WatchRepoTable />
      </div>
    </>
  );
}
