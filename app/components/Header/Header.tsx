import { Button } from "~/components/ui/button";
import {
  ExportMenuProps,
  Folder,
} from "~/contants/types";
import NewTaskDialog from "../NewTaskDialog/NewTaskDialog";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { SidebarContent } from "../Sidebar/SidebarContent";
import { Menu } from "~/contants/icons";
import { Dropdown } from "../Dropdown/Dropdown";
import { FolderOptions } from "../FolderOptions/FolderOptions";
import { TaskSort } from "../TaskSort/TaskSort";
import { useTranslation } from "react-i18next";
import { TranslationsMenu } from "../Translation/TranslationsMenu";

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
  const { t } = useTranslation("main");
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
        <Dropdown {...ExportMenuProps} />
        {!isMobile && <Button>{t("IMPORT")}</Button>}
        <NewTaskDialog folders={folders} />
        <TranslationsMenu/>
      </div>
    </div>
  );
}
