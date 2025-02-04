/* eslint-disable import/no-unresolved */
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Folder } from "~/constants/types";
import NewFolderDialog from "../NewFolderDialog/NewFolderDialog";
import { Plus } from "~/constants/icons";
import { useNavigate, useParams } from "@remix-run/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./SidebarContent.css";

export const SidebarContent = ({
  folders,
  isMobile,
  setSidebarOpen,
}: {
  folders: Folder[];
  isMobile: boolean;
  setSidebarOpen: (open: boolean) => void;
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { t } = useTranslation("main");
  return (
    <div className="sticky top-0">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold">{t("FOLDERS")}</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              {Plus}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("NEW_FOLDER")}</DialogTitle>
            </DialogHeader>
            <NewFolderDialog setIsOpen={setIsOpen} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="scrollbar-hidden space-y-2 overflow-y-auto max-h-[calc(100vh-100px)]">
        {folders.map((folder) => (
          <div
            key={folder.id}
            role="button"
            tabIndex={0}
            className={`flex items-center gap-3 p-2 rounded-lg ${
              params.folderId === folder.id ? "bg-white" : ""
            } hover:bg-white cursor-pointer`}
            onClick={() => {
              isMobile && setSidebarOpen(false);
              if (params.folderId === folder.id) return;
              navigate(`/folders/${folder.id}/tasks`);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                isMobile && setSidebarOpen(false);
                if (params.folderId === folder.id) return;
                navigate(`/folders/${folder.id}/tasks`);
              }
            }}
          >
            <div className="text-xl">{folder.icon}</div>
            <div className="flex-1">
              <div className="font-medium truncate w-36">{folder.name}</div>
              <div className="text-sm text-gray-500">
                {folder.taskCount} {t("TASKS")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
