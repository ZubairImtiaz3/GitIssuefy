import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const WatchRepoTable = () => {
  return (
    <>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Watched Repositories</CardTitle>
          <CardDescription>List of your watched repositories.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable searchKey="NAME" columns={columns} data={[]} />
        </CardContent>
      </Card>
    </>
  );
};
