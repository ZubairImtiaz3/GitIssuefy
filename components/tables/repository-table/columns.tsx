"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { WatchedRepo } from "@/components/tables/repository-table/watch-repo-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dayjs from "dayjs";

interface LabelsCellProps {
  value: string[];
}

 const BadgeList = ({ value }: LabelsCellProps) => (
   <>
     {value.map((label, index) => (
       <Badge key={index} variant="outline" className="mr-1">
         {label}
       </Badge>
     ))}
   </>
 );

 const LabelsCell = ({ value }: LabelsCellProps) => {
   const showTooltip = value.length > 2;

   return (
     <TooltipProvider>
       {showTooltip ? (
         <Tooltip>
           <TooltipTrigger asChild>
             <span className="truncate cursor-pointer">
               <BadgeList value={value.slice(0, 2)} />
               {value.length > 2 && <span>...</span>}
             </span>
           </TooltipTrigger>
           <TooltipContent>
             <div>
               <BadgeList value={value} />
             </div>
           </TooltipContent>
         </Tooltip>
       ) : (
         <span>
           <BadgeList value={value} />
         </span>
       )}
     </TooltipProvider>
   );
 };

export const columns: ColumnDef<WatchedRepo>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "watched_repo",
    header: "Repository",
  },
  {
    accessorKey: "labels",
    header: "Labels",
    cell: (info) => <LabelsCell value={info.getValue() as string[]} />,
  },
  {
    accessorKey: "last_checked",
    header: "Last Checked",
    cell: ({ row }) => {
      const date = row.original.last_checked;
      return date ? dayjs(new Date(date)).format("MM/DD/YYYY HH:mm:ss") : "N/A";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge className="" variant="outline">
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
