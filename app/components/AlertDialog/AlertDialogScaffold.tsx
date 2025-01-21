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
  handleCanle,
}: {
  warning: string;
  description: string;
  onClick?: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleCanle?: () => void;
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
              handleCanle ?? handleCanle;
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
