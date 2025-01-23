import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Folder, Task } from "~/contants/types";
import { useFetcher, useNavigate } from "@remix-run/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface NewTaskDialogProps {
  folders: Folder[];
}

const initialTask: Task = {
  id: "",
  title: "New task",
  folderId: "default",
  status: "todo",
  createdAt: "",
  updatedAt: "",
  time: "",
  note: "",
};

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "inprogress",
  PENDING = "pending",
  DONE = "done",
}

export default function NewTaskDialog({ folders }: NewTaskDialogProps) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task>(initialTask);
  const [isChange, setIsChange] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("main");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", "");
    formData.append("title", task.title);
    formData.append("folderId", task.folderId);
    formData.append("status", task.status);
    formData.append("createdAt", new Date().toISOString());
    formData.append("updatedAt", new Date().toISOString());
    formData.append(
      "time",
      task.time === ""
        ? new Date().toISOString()
        : new Date(task.time).toISOString()
    );

    formData.append("note", task.note);

    fetcher.submit(formData, {
      method: "post",
      action: "/tasks",
    });
    setTask(initialTask);
    setIsOpen(false);
    navigate(`/folders/${task.folderId}/tasks`);
  };

  React.useEffect(() => {
    const hasChanged = JSON.stringify(task) !== JSON.stringify(initialTask);
    setIsChange(hasChanged);
  }, [task, initialTask]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button>{t("NEW_TASK")}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("NEW_TASK")}</DialogTitle>
        </DialogHeader>
        <fetcher.Form onSubmit={handleSubmit}>
          <div className="space-y-4 pt-4">
            <Input
              placeholder="What are you planning?"
              name="title"
              value={task.title}
              onChange={handleInputChange}
            />
            <div className="flex items-center gap-2">
              <Input
                type="datetime-local"
                name="time"
                value={task.time.toString()}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Add note"
                name="note"
                value={task.note}
                onChange={handleInputChange}
              />
            </div>
            <Select
              name="folderId"
              value={task.folderId}
              onValueChange={(value) => setTask({ ...task, folderId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select folder" />
              </SelectTrigger>
              <SelectContent>
                {folders.map((folder) => (
                  <SelectItem key={folder.id} value={folder.id}>
                    {folder.icon} {folder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              name="status"
              value={task.status}
              onValueChange={(value) =>
                setTask({
                  ...task,
                  status: value as TaskStatus,
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">{t("STATUS_TODO")}</SelectItem>
                <SelectItem value="inprogress">
                  {t("STATUS_IN_PROGRESS")}
                </SelectItem>
                <SelectItem value="pending">{t("STATUS_PENDING")}</SelectItem>
                <SelectItem value="done">{t("STATUS_DONE")}</SelectItem>
              </SelectContent>
            </Select>
            <Button
              disabled={!isChange || fetcher.state === "submitting"}
              className="w-full"
            >
              {fetcher.state === "submitting" ? "Creating..." : "Create"}
            </Button>
          </div>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
