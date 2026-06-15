import { Skeleton } from "@heroui/react";
import React from "react";
interface ITabelSkeletonProps {
  rows: number;
  cols: number;
}
function TabelSkeleton({ rows = 5, cols = 4 }: ITabelSkeletonProps) {
  return (
    <div className="">
      <div className="flex flex-row justify-between bg-muted/40 p-3 rounded-lg bg-default-100">
        {Array.from({ length: cols }).map((_, idx) => (
          <Skeleton key={idx} className="h-4 w-20 rounded-lg" />
        ))}
      </div>
      <div>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <div key={rowIdx} className="flex flex-col items-center p-3">
            <Skeleton className="h-[40px] w-full rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabelSkeleton;
