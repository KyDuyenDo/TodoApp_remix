import { useMemo } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Folder, Task } from "~/contants/types";
import { format } from "date-fns";
import { CalendarIcon, FolderIcon, RightArrow, Update } from "~/contants/icons";
import {
  useFetcher,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import { useTranslation } from "react-i18next";

export default function TaskList({
  tasks,
  folders,
  total,
}: {
  tasks: Task[];
  folders: Folder[];
  total: number;
}) {
  const navigate = useNavigate();
  const params = useParams();
  const fetcher = useFetcher();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation("main");
  
  const currentPage = useMemo(() => {
    const page = searchParams.get("page");
    return page ? Number.parseInt(page) : 1;
  }, [searchParams]);

  const tasksPerPage = 5;
  const totalPages = useMemo(() => Math.ceil(total / tasksPerPage), [total]);

  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  const folderMap = useMemo(() => {
    return folders.reduce((acc, folder) => {
      acc[folder.id] = folder.name;
      return acc;
    }, {} as Record<string, string>);
  }, [folders]);

  const handleButtonClick = (taskId: string) => {
    const folderId = params.folderId;
    const newPath = `/folders/${folderId}/tasks/${taskId}?${searchParams.toString()}`;
    navigate(newPath);
  };

  const handleChange = (taskId: string) => {
    const formData = new FormData();
    formData.append("id", taskId);
    formData.append("status", "done");
    formData.append("updatedAt", new Date().toISOString());

    fetcher.submit(formData, {
      method: "put",
      action: "/tasks",
    });
  };

  const handleClickPrevious = () => {
    if (!isPreviousDisabled) {
      searchParams.set("page", (currentPage - 1).toString());
      setSearchParams(searchParams);
    }
  };

  const handleClickNext = () => {
    if (!isNextDisabled) {
      searchParams.set("page", (currentPage + 1).toString());
      setSearchParams(searchParams);
    }
  };

  const displayedTaskRange = useMemo(() => {
    const startIndex = (currentPage - 1) * tasksPerPage + 1;
    const endIndex = Math.min(currentPage * tasksPerPage, total);
    return `Showing ${startIndex}-${endIndex} of ${total} tasks`;
  }, [currentPage, total, tasksPerPage]);

  return (
    <>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-4 p-4 bg-white rounded-lg hover:shadow"
          >
            <input
              type="checkbox"
              className="mt-1 w-5 h-5 cursor-pointer"
              disabled={task.status === "done"}
              checked={task.status === "done"}
              onChange={() => handleChange(task.id)}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4">
                <h3 className={`text-base font-medium truncate`}>
                  {task.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-[3px]">
                  {CalendarIcon}
                  <span>{format(task.time, "MM/dd/yyyy HH:mm")}</span>
                </div>
                <div className="flex items-center gap-[3px]">
                  {Update}
                  <span>{format(task.updatedAt, "MM/dd/yyyy HH:mm")}</span>
                </div>
                <div className="flex items-center gap-[3px]">
                  {FolderIcon}
                  <span>{folderMap[task.folderId] || "Unknown Folder"}</span>
                </div>

                <Badge variant="secondary" className="px-2 py-0.5 font-normal">
                  {task.status}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleButtonClick(task.id)}
            >
              {RightArrow}
            </Button>
          </div>
        ))}
      </div>
      {total > 0 && (
        <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
          <div className="text-sm text-gray-500">{displayedTaskRange}</div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleClickPrevious}
              disabled={isPreviousDisabled}
            >
              {t("PREVIOUS")}
            </Button>
            <Button
              variant="outline"
              onClick={handleClickNext}
              disabled={isNextDisabled}
            >
              {t("NEXT")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
