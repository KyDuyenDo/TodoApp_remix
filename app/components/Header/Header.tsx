/* eslint-disable import/no-unresolved */
import { Button } from "~/components/ui/button";
import { Folder } from "~/constants/types";
import NewTaskDialog from "../NewTaskDialog/NewTaskDialog";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { SidebarContent } from "../Sidebar/SidebarContent";
import { Menu } from "~/constants/icons";
import { FolderOptions } from "../FolderOptions/FolderOptions";
import { TranslationsMenu } from "../Translation/TranslationsMenu";
import { ExcelImport } from "../ImportButton/ExcelImport";
import ExportToExcel from "../ExportOption/ExportToExcel";
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
    <div className="flex items-center justify-between flex-wrap gap-4">
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
        <div className="flex items-center gap-2 flex-wrap">
          {!searchParams.get("exportSelection") && <ExportToExcel />}
          {!isMobile && !searchParams.get("exportSelection") && <ExcelImport />}
          {!searchParams.get("exportSelection") && (
            <NewTaskDialog folders={folders} />
          )}
          <TranslationsMenu />
        </div>
      </div>
    </div>
  );
}
