import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function OrderSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <div className="lg:col-span-3">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>

            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center border-b pb-4">
                  <Skeleton className="h-20 w-20 rounded-md" />
                  <div className="ml-4 flex-1">
                    <Skeleton className="mb-2 h-5 w-32" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="mr-4 flex items-center rounded-md border">
                    <Skeleton className="h-8 w-24" />
                  </div>
                  <div className="min-w-[80px] text-right">
                    <Skeleton className="mb-2 h-5 w-16" />
                    <Skeleton className="mx-auto h-8 w-8 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <Skeleton className="mb-6 h-6 w-48" />
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <Skeleton className="mb-6 h-6 w-40" />
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Skeleton className="mb-6 h-6 w-48" />
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="mb-4 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="mb-4 space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-24 w-full" />
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Skeleton className="h-12 w-full" />
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardContent className="p-6">
            <Skeleton className="mb-6 h-6 w-40" />

            <div className="mb-6 space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="flex justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-16" />
              </div>

              <div className="flex justify-between border-t pt-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>

            <div className="mt-8">
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
