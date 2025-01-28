import { DownIcon, ExportIcon, FilterIcon, globalIcon } from "./icons";

export interface Folder {
  id: string;
  name: string;
  icon: string;
  taskCount?: number;
  isDefault?: boolean;
}

export interface Task {
  id: string;
  title: string;
  folderId: string;
  status: "todo" | "inprogress" | "pending" | "done";
  time: string;
  createdAt: string;
  updatedAt: string;
  note: string;
}

export interface TaskDetailPanelProps {
  folders: Folder[];
  task: Task;
  openSheet?: boolean;
  setOpenSheet?: (value: boolean) => void;
}

export interface MenuDropdownProps {
  dropdownItems: { key: string; value: string }[];
  icon: JSX.Element | null;
  title: string | null;
  variant?: "outline" | "ghost";
  setSelection?: (key: string, value: string) => void;
}

export type SortOption = {
  label: string;
  value: string;
};

// Export Menu Props
export const ExportMenuProps: MenuDropdownProps = {
  dropdownItems: [
    { key: "item", value: "EXPORT_SELECTED_ITEMS" },
    { key: "folder", value: "EXPORT_CURRENT_FOLDER" },
  ],
  icon: ExportIcon,
  title: null,
};

// Translations Menu Props
export const TranslationsMenuProps: MenuDropdownProps = {
  title: null,
  icon: globalIcon,
  dropdownItems: [
    { key: "en", value: "ENGLISH" },
    { key: "vi", value: "VIETNAMESE" },
  ],
};

// Filter Menu Props
export const FilterMenuProps: MenuDropdownProps = {
  title: null,
  icon: FilterIcon,
  dropdownItems: [
    { key: "status", value: "SORT_BY_STATUS" },
    { key: "date", value: "SORT_BY_DATE" },
    { key: "name", value: "SORT_BY_NAME" },
  ],
};

// Create Folder Menu Props
export const createFolderMenuProps = (title: string): MenuDropdownProps => {
  return {
    title,
    icon: DownIcon,
    dropdownItems: [
      { key: "rename", value: "RENAME" },
      { key: "delete", value: "DELETE" },
    ],
    variant: "ghost",
  };
};

export const statusOptions: SortOption[] = [
  { label: "STATUS_ALL", value: "all" },
  { label: "STATUS_TODO", value: "todo" },
  { label: "STATUS_IN_PROGRESS", value: "inprogress" },
  { label: "STATUS_DONE", value: "done" },
  { label: "STATUS_PENDING", value: "pending" },
];

export const updateOptions: SortOption[] = [
  { label: "UPDATE_DEFAULT", value: "default" },
  { label: "UPDATE_LATEST_UPDATED", value: "latest" },
];
