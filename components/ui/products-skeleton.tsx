export default function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm"
        >
          <div className="flex h-full flex-col justify-between p-6">
            <div>
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <div className="mb-2 h-7 w-40 animate-pulse rounded-lg bg-muted"></div>
                </div>
                <div className="ml-1 h-7 w-24 animate-pulse rounded-lg bg-muted"></div>
              </div>

              <div className="mb-4 h-4 w-52 animate-pulse rounded-lg bg-muted"></div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex h-8 w-24 animate-pulse items-center rounded-md border bg-muted"></div>
              <div className="flex h-10 w-28 animate-pulse items-center rounded-md border bg-muted"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
