import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { FilterIcon, UpDownIcon } from "~/contants/icons";
import { SortOption, statusOptions, updateOptions } from "~/contants/types";
import { useUrlState } from "~/hooks/useUrlState";

const statusMap = Object.fromEntries(statusOptions.map(opt => [opt.value, opt.label]));
const updateMap = Object.fromEntries(updateOptions.map(opt => [opt.value, opt.label]));

export function TaskSort() {
  const {t} = useTranslation("main");
  const [status, setStatus] = useUrlState("status", "all", statusMap);
  const [updateSort, setUpdateSort] = useUrlState("sort", "default", updateMap);

  const handleStatusChange = (option: SortOption) => {
    setStatus(option.value);
  };

  const handleUpdateSortChange = (option: SortOption) => {
    setUpdateSort(option.value);
  };

  return (
    <div className="flex flex-row sm:flex-row gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-between">
            {t(statusMap[status])}
            {FilterIcon}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>{t('FILTER_BY_STATUS')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleStatusChange(option)}
            >
              {t(option.label)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-between">
            {t(updateMap[updateSort])}
            {UpDownIcon}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>{t('SORT_BY_UPDATE_TIME')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {updateOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleUpdateSortChange(option)}
            >
              {t(option.label)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

