import {
  Outlet,
  ShouldRevalidateFunction,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import TaskList from "~/components/TaskList/TaskList";
import { Folder, Task } from "~/contants/types";
import {
  getAllTasks,
  getAllTasksFiltered,
  getTasksByFolderId,
  getTasksFilteredByFolderId,
} from "~/models/task";
import { useEffect, useMemo, useState } from "react";
import { SkeletonTaskList } from "~/components/TaskList/SkeletonTaskList";

// loader function is used to fetch data for the page
export const loader: LoaderFunction = async ({ params, request }) => {
  if (!params.folderId) {
    throw new Error("folderId is required");
  }
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams.toString());
  if (!searchParams.has("page")) {
    searchParams.set("page", "1");
  }
  if (params.folderId === "all") {
    if (searchParams.has("status") || searchParams.has("sort")) {
      const { tasks, total } = await getAllTasksFiltered(
        searchParams.toString()
      );
      return json({ tasks, total });
    }
    const { tasks, total } = await getAllTasks(searchParams.toString());
    return json({ tasks, total });
  }
  if (searchParams.has("status") || searchParams.has("sort")) {
    const { tasks, total } = await getTasksFilteredByFolderId(
      params.folderId,
      searchParams.toString()
    );
    return json({ tasks, total });
  }
  const { tasks, total } = await getTasksByFolderId(
    params.folderId,
    searchParams.toString()
  );
  return json({ tasks, total });
};
// shouldRevalidate function is used to determine if the page should be revalidated
export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentParams,
  nextParams,
}) => {
  if (!currentParams.taskId && nextParams.taskId) return false;
  if (
    currentParams.taskId &&
    !nextParams.taskId &&
    currentParams.folderId === nextParams.folderId
  )
    return false;
  return true;
};

export default function FolderTasks() {
  const { isMobile, folders, context } = useOutletContext<{
    isMobile: boolean;
    context: string;
    folders: Folder[];
  }>();
  const loaderData = useLoaderData<typeof loader>();
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  if (context !== "task-list") return null;
  useEffect(() => {
    const fetchfolders = async () => {
      setLoading(true);
      const { tasks, total } = await new Promise<{
        tasks: Task[];
        total: number;
      }>(
        (resolve) => setTimeout(() => resolve(loaderData), 500) // Simulated delay
      );
      setTasks(tasks);
      setTotal(total);
      setLoading(false);
    };

    fetchfolders();
  }, [loaderData]);

  useMemo(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("export_tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  return (
    <div className="flex">
      <div className="flex-grow">
        {loading ? (
          <SkeletonTaskList />
        ) : (
          tasks && <TaskList tasks={tasks} folders={folders} total={total} />
        )}
      </div>
      <Outlet
        context={{
          isMobile,
          folders,
          context: "task-detail",
        }}
      />
    </div>
  );
}
