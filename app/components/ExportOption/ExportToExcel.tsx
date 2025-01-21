import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { exportUtil } from "../utils/Export.util";
import { useSearchParams } from "@remix-run/react";

const ExportToExcel = () => {
  const { t } = useTranslation("main");
  const [searchParams, setSearchParams] = useSearchParams();

  const setIsExportSelectedItems = () => {
    searchParams.set("exportSelection", "true");
    setSearchParams(searchParams);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="px-[15px]">{t("EXPORT")}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setIsExportSelectedItems()}>
          {t("EXPORT_SELECTED_ITEMS")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportUtil("export_tasks")}>
          {t("EXPORT_CURRENT_FOLDER")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportToExcel;
