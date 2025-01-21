import { Skeleton } from "../ui/skeleton";
import { CalendarIcon, FolderIcon, Update } from "~/contants/icons";

export const SkeletonTaskList = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 bg-white rounded-lg hover:shadow"
        >
          <Skeleton className="w-5 h-5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4">
              <h3 className={`text-base font-medium truncate`}>
                <Skeleton className="w-24 h-5" />
              </h3>
            </div>

            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-[3px]">
                {CalendarIcon}
                <Skeleton className="w-24 h-5" />
              </div>
              <div className="flex items-center gap-[3px]">
                {Update}
                <Skeleton className="w-24 h-5" />
              </div>
              <div className="flex items-center gap-[3px]">
                {FolderIcon}
                <Skeleton className="w-24 h-5" />
              </div>
              <Skeleton className="w-24 h-5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
