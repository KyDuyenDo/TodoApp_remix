/* eslint-disable import/no-unresolved */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

export const AlertDialogScaffold = ({
  warning,
  description,
  onClick,
  isOpen,
  setIsOpen,
  handleCancel,
}: {
  warning: string;
  description: string;
  onClick?: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleCancel?: () => void;
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{warning}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setIsOpen(false);
              if(handleCancel) handleCancel();
            }}
          >
            Cancel
          </AlertDialogCancel>
          {onClick && (
            <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
