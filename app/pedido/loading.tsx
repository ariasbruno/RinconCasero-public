import { OrderSkeleton } from "@/components/ui/order-skeleton";

export default function Loading() {
  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 h-12 w-3/4 max-w-md">
            <div className="h-full w-full animate-pulse rounded bg-muted"></div>
          </div>
          <div className="mx-auto h-6 w-1/2 max-w-sm">
            <div className="h-full w-full animate-pulse rounded bg-muted"></div>
          </div>
        </div>

        <OrderSkeleton />
      </div>
    </div>
  );
}
