import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface WatchedRepo {
  user_id: string;
  labels: string[];
  watched_repo: string;
  last_checked: string;
  status: string;
  $id: string;
}

interface WatchRepoTableProps {
  data: WatchedRepo[];
}

export const WatchRepoTable = ({ data }: WatchRepoTableProps) => {
  return (
    <>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Watched Repositories</CardTitle>
          <CardDescription>List of your watched repositories.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable searchKey="NAME" columns={columns} data={data} />
        </CardContent>
      </Card>
    </>
  );
};
