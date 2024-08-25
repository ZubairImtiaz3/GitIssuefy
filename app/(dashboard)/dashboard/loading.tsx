import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <>
      <div className="flex gap-4 flex-wrap">
        <SkeletonCard />

        <div className="flex gap-4 grow">
          <SkeletonStatCard />
          <SkeletonStatCard />
        </div>
      </div>

      <div className="mt-6">
        <SkeletonTable />
      </div>
    </>
  );
}

function SkeletonCard() {
  return (
    <Card className="sm:col-span-2 grow w-full lg:w-auto">
      <CardHeader>
        <Skeleton className="h-5 w-1/4 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-4 w-1/3" />
      </CardHeader>
      <CardFooter>
        <Skeleton className="h-8 w-1/4" />
      </CardFooter>
    </Card>
  );
}

function SkeletonStatCard() {
  return (
    <Card className="grow">
      <CardHeader>
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-10 w-1/2 mb-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-1/4" />
      </CardContent>
    </Card>
  );
}

function SkeletonTable() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/4 mb-4" />
      </CardHeader>
      <CardContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-full mb-4" />
        ))}
      </CardContent>
    </Card>
  );
}

export function SkeletonButton() {
  return (
    <Skeleton className="h-11 rounded-md w-52 gap-4 bg-primary flex items-center justify-center">
      <Loader className="animate-spin text-black" />
    </Skeleton>
  );
}
