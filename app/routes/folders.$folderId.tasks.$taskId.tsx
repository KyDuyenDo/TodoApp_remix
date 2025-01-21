import { useLoaderData, useOutletContext, useParams } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import TaskDetailPanel from "~/components/TaskDetailPanel/TaskDetailPanel";
import MobileDrawer from "~/components/MobileDrawerProps/MobileDrawerProps";
import { Folder, Task } from "~/contants/types";
import React, { useEffect } from "react";
import { getTaskById } from "~/models/task";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.taskId) {
    throw new Response("Task ID is required", { status: 400 });
  }
  const task = await getTaskById(params.taskId);
  if (!task) {
    throw new Response("Task not found", { status: 404 });
  }
  return json({ task });
};

export default function TaskDetail() {
  const { task } = useLoaderData<{ task: Task }>();
  const params = useParams();
  const [openSheet, setOpenSheet] = React.useState(false);
  const { isMobile, folders, context } = useOutletContext<{
    isMobile: boolean;
    context: string;
    folders: Folder[];
  }>();
  if (context !== "task-detail") return null;
  
  useEffect(() => {
    if (params.taskId) {
      setOpenSheet(true);
    } else {
      setOpenSheet(false);
    }
  }, [params]);

  if (isMobile) {
    return (
      <MobileDrawer
        folders={folders}
        task={task}
        openSheet={openSheet}
        setOpenSheet={setOpenSheet}
      />
    );
  }

  return (
    <TaskDetailPanel
      folders={folders}
      task={task}
      openSheet={openSheet}
      setOpenSheet={setOpenSheet}
    />
  );
}
