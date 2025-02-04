/* eslint-disable import/no-unresolved */
import { Drawer, DrawerContent } from "~/components/ui/drawer";
import { Folder, Task } from "~/constants/types";
import TaskDetail from "../TaskDetailPanel/TaskDetail";
import { useNavigate, useParams } from "@remix-run/react";

interface MobileDrawerProps {
  folders: Folder[];
  task: Task;
  openSheet: boolean;
  setOpenSheet: (open: boolean) => void;
}

export default function MobileDrawer({
  folders,
  task,
  openSheet,
}: MobileDrawerProps) {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className="flex items-center gap-[13px]">
      {openSheet && (
        <Drawer
          open={openSheet}
          onOpenChange={() => {
            navigate(`/folders/${params.folderId}/tasks`);
          }}
        >
          <DrawerContent>
            <div className="p-10">
              <TaskDetail folders={folders} task={task} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
