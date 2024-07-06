import { Skeleton } from "@/components/ui/skeleton";

export function useLoader({ isLoading }: { isLoading: boolean }) {
  function loader(
    Component: React.ReactNode,
    {
      loadClass,
      multiple = 0,
      condition = true,
    }: { loadClass: string; multiple?: number; condition?: boolean },
  ) {
    if (!condition) return null;

    if (isLoading) {
      return multiple > 0 ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: multiple }).map((_, idx) => (
            <Skeleton key={idx} className={loadClass} />
          ))}
        </div>
      ) : (
        <Skeleton className={loadClass} />
      );
    }

    return Component;
  }

  return { loader };
}
