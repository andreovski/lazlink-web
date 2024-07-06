import { Skeleton } from "../ui/skeleton";

export function SkeletonServices() {
  return Array.from({ length: 3 }).map((_, idx) => (
    <div key={idx} className="mb-2 flex gap-2">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-[60vw] md:w-[22vw] lg:w-[26vw]" />
        {Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton
            key={idx}
            className="h-4 w-[68vw] md:w-[35vw] lg:w-[38vw]"
          />
        ))}
      </div>
      <Skeleton className="h-6 w-6 rounded-full" />
    </div>
  ));
}
