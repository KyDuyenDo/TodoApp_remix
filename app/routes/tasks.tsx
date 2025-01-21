import { ActionFunctionArgs, json } from "@remix-run/node";
import { Task } from "~/contants/types";
import { createTask, deleteTask, updateTask } from "~/models/task";
import { v4 as uuidv4 } from "uuid";

export async function action({ request }: ActionFunctionArgs) {
  const method = request.method.toUpperCase();
  switch (method) {
    case "POST": {
      const task = Object.fromEntries(
        await request.formData()
      ) as unknown as Task;
      try {
        const newTask = await createTask({ ...task, id: uuidv4() });
        return json({ newTask });
      } catch (error) {
        console.error("Error creating task:", error);
        return json({ error: "Failed to create task" }, { status: 500 });
      }
    }
    case "DELETE": {
      const formData = await request.formData();
      const id = formData.get("id") as string;
      const success = await deleteTask(id);
      if (success !== false) {
        return json({ success: true, actionType: "delete" });
      } else {
        return json({ success: false, actionType: "delete" }, { status: 400 });
      }
    }
    case "PUT": {
      const task = Object.fromEntries(
        await request.formData()
      ) as unknown as Task;
      try {
        const taskUpdated = await updateTask(task);
        return json({ taskUpdated, actionType: "update" });
      } catch (error) {
        console.error("Error updating task:", error);
        return json({ error: "Failed to update task" }, { status: 500 });
      }
    }
  }
}
