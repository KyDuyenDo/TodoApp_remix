import { useNavigate, useParams } from "@remix-run/react";
import React, { useEffect, useRef, useState } from "react";
import { createFolderMenuProps, Folder } from "~/contants/types";
import { Input } from "../ui/input";
import { Dropdown } from "../Dropdown/Dropdown";
import { AlertDialogScaffold } from "../AlertDialog/AlertDialogScaffold";
import { useFetcher } from "@remix-run/react";

export const FolderOptions = ({ folders }: { folders: Folder[] }) => {
  const [selection, setSelection] = React.useState({key:"", value:""});
  const [foldeProps, setFolderProps] = React.useState<Folder>({
    id: "",
    name: "",
    icon: "",
    taskCount: 0,
  });
  const [isRenameFolderOpen, setIsRenameFolderOpen] = React.useState(false);
  const [isDeleteFolderOpen, setIsDeleteFolderOpen] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState("");
  const params = useParams();
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const [isDeleteFailed, setIsDeleteFailed] = useState(false);

  const handleDelete = () => {
    if (params.folderId) {
      fetcher.submit(
        { id: params.folderId },
        { method: "delete", action: `/folders` }
      );
    }
  };

  const handleRenameFolder = () => {
    setIsRenameFolderOpen(false);
    if (params.folderId) {
      fetcher.submit(
        { ...foldeProps, name: newFolderName },
        { method: "put", action: `/folders` }
      );
    }
  };

  useEffect(() => {
    if (fetcher.data) {
      const data = fetcher.data as { success: boolean };
      const success = data.success;
      if (success === false) {
        setIsDeleteFailed(true);
      } else if (selection.value === "Delete") {
        navigate("/folders/all/tasks");
      } else if (selection.value === "Rename") {
        setFolderProps({ ...foldeProps, name: newFolderName });
      }
      setSelection({key:"", value:""});
    }
  }, [fetcher.data, navigate]);

  useEffect(() => {
    if (foldeProps.id !== params.folderId) {
      const folder = folders.find((f) => f.id === params.folderId);
      if (folder) {
        setFolderProps(folder);
        setNewFolderName(folder.name);
      }
    }
  }, [params]);

  useEffect(() => {
    if (selection.value === "Rename") {
      setIsRenameFolderOpen(true);
    } else {
      setIsRenameFolderOpen(false);
    }
    if (selection.value === "Delete") {
      setIsDeleteFolderOpen(true);
    } else {
      setIsDeleteFolderOpen(false);
    }
  }, [selection]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isRenameFolderOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isRenameFolderOpen]);

  return (
    <>
      {isDeleteFolderOpen && (
        <AlertDialogScaffold
          isOpen={isDeleteFolderOpen}
          setIsOpen={setIsDeleteFolderOpen}
          warning="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your folder"
          onClick={() => handleDelete()}
          handleCanle={() => setSelection({key:"", value:""})}
        />
      )}
      {isDeleteFailed && (
        <AlertDialogScaffold
          isOpen={isDeleteFailed}
          setIsOpen={setIsDeleteFailed}
          warning="Delete failed"
          handleCanle={() => setSelection({key:"", value:""})}
          description="The folder you want to delete is not empty or it is default"
        />
      )}
      {isRenameFolderOpen ? (
        <Input
          ref={inputRef}
          value={newFolderName}
          onChange={(event) => setNewFolderName(event.target.value)}
          onBlur={() => {
            setIsRenameFolderOpen(false);
            setSelection({key:"", value:""});
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleRenameFolder();
            }
          }}
        />
      ) : (
        <Dropdown
          {...createFolderMenuProps(foldeProps.name)}
          setSelection={(key: string, value: string) => setSelection({ key, value })}
        />
      )}
    </>
  );
};
