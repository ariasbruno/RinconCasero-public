import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function MenuItemSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <CardContent className="p-6">
        <div className="mb-2 flex items-start justify-between">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-4 h-4 w-3/4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}
