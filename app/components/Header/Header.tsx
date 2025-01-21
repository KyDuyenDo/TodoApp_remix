import { Button } from "~/components/ui/button";
import { Folder } from "~/contants/types";
import NewTaskDialog from "../NewTaskDialog/NewTaskDialog";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { SidebarContent } from "../Sidebar/SidebarContent";
import { Menu } from "~/contants/icons";
import { FolderOptions } from "../FolderOptions/FolderOptions";
import { TaskSort } from "../TaskSort/TaskSort";
import { TranslationsMenu } from "../Translation/TranslationsMenu";
import { ExcelImport } from "../ImportButton/ExcelImport";
import ExportToExcel from "../ExportOption/ExportToExcel";
import { useEffect, useState } from "react";
import { useSearchParams } from "@remix-run/react";

interface HeaderProps {
  isMobile: boolean;
  folders: Folder[];
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}

export default function Header({
  isMobile,
  folders,
  setSidebarOpen,
  sidebarOpen,
}: HeaderProps) {
  const [searchParams] = useSearchParams();

  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div className="flex items-center gap-[13px]">
        {isMobile && (
          <Drawer open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon">
                {Menu}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-4">
                <SidebarContent
                  folders={folders}
                  isMobile={isMobile}
                  setSidebarOpen={setSidebarOpen}
                />
              </div>
            </DrawerContent>
          </Drawer>
        )}
        <FolderOptions folders={folders} />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <TaskSort />
        {!searchParams.get("exportSelection") && <ExportToExcel />}
        {!isMobile && !searchParams.get("exportSelection") && <ExcelImport />}
        {!searchParams.get("exportSelection") && (
          <NewTaskDialog folders={folders} />
        )}
        <TranslationsMenu />
      </div>
    </div>
  );
}
