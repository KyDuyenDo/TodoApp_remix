import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { MenuDropdownProps } from "~/contants/types";

export const Dropdown: React.FC<MenuDropdownProps> = ({
  dropdownItems,
  icon,
  title,
  variant = "outline",
  setSelection,
}) => {
  const {t} = useTranslation("main");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="px-[15px]"
          variant={variant}
          size={icon && title == null ? "icon" : "lg"}
        >
          {title ? <h1 className="text-xl font-bold">{title}</h1> : ""}
          {icon ? icon : ""}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropdownItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => {
              setSelection && setSelection(item.key, item.value);
            }}
          >
            {t(item.value)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
