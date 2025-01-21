import React from "react";
import { Button } from "../ui/button";
import { TaskDetailPanelProps } from "~/contants/types";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import TaskDetail from "./TaskDetail";
import { useNavigate, useParams, useSearchParams } from "@remix-run/react";
import { useTranslation } from "react-i18next";

const TaskDetailPanel: React.FC<TaskDetailPanelProps> = ({
  folders,
  task,
  openSheet,
}) => {
  const naviagte = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation("main");
  return (
    <Sheet
      open={openSheet}
      onOpenChange={() => {
        naviagte(`/folders/${params.folderId}/tasks?${searchParams.toString()}`);
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('TASK_DETAIL')}</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <TaskDetail folders={folders} task={task} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetailPanel;
