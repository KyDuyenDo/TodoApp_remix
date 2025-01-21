import React from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Task, TaskDetailPanelProps } from "~/contants/types";
import { statusOptions } from "~/contants/mock";
import {
  useFetcher,
  useLocation,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { AlertDialogScaffold } from "../AlertDialog/AlertDialogScaffold";
import { useTranslation } from "react-i18next";

const TaskDetail: React.FC<TaskDetailPanelProps> = ({ folders, task }) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [updatetask, setUpdateTask] = React.useState<Task>({ ...task });
  const [isChange, setIsChange] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const { t } = useTranslation("main");

  React.useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      const { actionType, taskUpdated } = fetcher.data as {
        actionType: string;
        taskUpdated?: Task;
      };
      if (actionType === "update" && taskUpdated) {
        setUpdateTask(taskUpdated);
        fetcher.load(location.pathname);
      }
    }
  }, [fetcher.state, fetcher.data]);

  React.useEffect(() => {
    const hasChanged = JSON.stringify(updatetask) !== JSON.stringify(task);
    setIsChange(hasChanged);
  }, [updatetask]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();

    Object.entries(updatetask).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("updatedAt", new Date().toISOString());

    fetcher.submit(formData, {
      method: "put",
      action: "/tasks",
    });
  };

  const handleDelete = () => {
    navigate(`/folders/${params.folderId}/tasks`);
    const formData = new FormData();
    if (params.folderId) {
      formData.append("folderId", params.folderId);
    }
    formData.append("id", task.id);
    fetcher.submit(formData, { method: "delete", action: `/tasks` });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDateTimeLocal = (dateString: string) => {
    const date = new Date(dateString);
    const pad = (n: number) => (n < 10 ? "0" : "") + n;
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate()
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  return (
    <>
      <fetcher.Form onSubmit={handleSubmit}>
        <Input
          className="mb-4"
          name="title"
          value={updatetask.title}
          onChange={handleInputChange}
        />

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              {t("DESCRIPTION")}
            </label>
            <Input
              placeholder="Add description..."
              name="note"
              value={updatetask.note}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">{t('FOLDER')}</label>
            <Select
              value={updatetask.folderId}
              name="folderId"
              onValueChange={(value) =>
                setUpdateTask({ ...updatetask, folderId: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {folders.map(
                  (folder) =>
                    folder.id !== "all" && (
                      <SelectItem key={folder.id} value={folder.id}>
                        {folder.icon} {folder.name}
                      </SelectItem>
                    )
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">{t('DUE_DATE')}</label>
            <Input
              value={formatDateTimeLocal(updatetask.time)}
              type="datetime-local"
              name="time"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">{t('STATUS')}</label>
            <Select
              value={updatetask.status}
              name="status"
              onValueChange={(value) =>
                setUpdateTask({
                  ...updatetask,
                  status: value as Task["status"],
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <Badge
                      variant="secondary"
                      className={`px-2 py-0.5 font-normal`}
                    >
                      {status.label}
                    </Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <Button
            type="button"
            onClick={() => setIsDelete(true)}
            variant="outline"
            className="text-red-500"
          >
            {t("DELETE_TASK")}
          </Button>
          <Button disabled={!isChange || fetcher.state === "submitting"}>
            {fetcher.state === "submitting" ? "Updating..." : t("SAVE_CHANGE")}
          </Button>
        </div>
      </fetcher.Form>
      <AlertDialogScaffold
        warning="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your task"
        isOpen={isDelete}
        setIsOpen={setIsDelete}
        onClick={() => handleDelete()}
      />
    </>
  );
};

export default TaskDetail;
