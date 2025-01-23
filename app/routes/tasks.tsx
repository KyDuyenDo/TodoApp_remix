import { type ActionFunctionArgs, json } from "@remix-run/node";
import {
  createTask,
  deleteTask,
  updateTask,
  createMultipleTasks,
} from "~/models/task";
import { v4 as uuidv4 } from "uuid";
import { Task } from "~/contants/types";

export async function action({ request }: ActionFunctionArgs) {
  const method = request.method.toUpperCase();
  // clone the request to read the body multiple times
  const clonedRequest = request.clone();

  switch (method) {
    case "POST": {
      const formData = await clonedRequest.formData();
      const tasksJson = formData.get("tasks");

      if (tasksJson && typeof tasksJson === "string") {
        try {
          const tasksArray = JSON.parse(tasksJson) as Task[];
          const newTasks = await createMultipleTasks(
            tasksArray.map((task) => ({ ...task, id: uuidv4() }))
          );
          return json({ newTasks });
        } catch (error) {
          console.error("Error creating multiple tasks:", error);
          return json(
            { error: "Failed to create multiple tasks" },
            { status: 500 }
          );
        }
      } else {
        const task = Object.fromEntries(formData) as unknown as Task;
        try {
          const newTask = await createTask({ ...task, id: uuidv4() });
          return json({ newTask });
        } catch (error) {
          console.error("Error creating task:", error);
          return json({ error: "Failed to create task" }, { status: 500 });
        }
      }
    }
    case "DELETE": {
      const formData = await clonedRequest.formData();
      const id = formData.get("id") as string;
      try {
        const success = await deleteTask(id);
        return json(
          { success: success !== false, actionType: "delete" },
          { status: success !== false ? 200 : 400 }
        );
      } catch (error) {
        console.error("Error deleting task:", error);
        return json({ error: "Failed to delete task" }, { status: 500 });
      }
    }
    case "PUT": {
      const formData = await clonedRequest.formData();
      const task = Object.fromEntries(formData) as unknown as Task;
      try {
        const taskUpdated = await updateTask(task);
        return json({ taskUpdated, actionType: "update" });
      } catch (error) {
        console.error("Error updating task:", error);
        return json({ error: "Failed to update task" }, { status: 500 });
      }
    }
    default: {
      return json({ error: "Method not allowed" }, { status: 405 });
    }
  }
}
