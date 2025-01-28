/* eslint-disable import/no-unresolved */
import { useMatches, useOutletContext, useParams } from "@remix-run/react";

import TaskDetailPanel from "~/components/TaskDetailPanel/TaskDetailPanel";
import MobileDrawer from "~/components/MobileDrawerProps/MobileDrawerProps";
import { Folder, Task } from "~/constants/types";
import React, { useEffect } from "react";

export default function TaskDetail() {
  const params = useParams();
  const matches = useMatches();
  // get the parent data from the parent route
  const parentData = matches.find(
    (match) => match.id === "routes/folders.$folderId.tasks"
  )?.data as { tasks: Task[] } | undefined;

  // find the task by id
  const task = parentData?.tasks?.find((t: Task) => t.id === params.taskId);

  const [openSheet, setOpenSheet] = React.useState(false);
  const { isMobile, folders } = useOutletContext<{
    isMobile: boolean;
    context: string;
    folders: Folder[];
  }>();
  useEffect(() => {
    if (params.taskId) {
      setOpenSheet(true);
    } else {
      setOpenSheet(false);
    }
  }, [params]);

  if (!task) {
    return null;
  }

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
