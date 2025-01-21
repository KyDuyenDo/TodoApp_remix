import { ActionFunctionArgs, json } from "@remix-run/node";
import { Folder } from "~/contants/types";
import {
  createFolder,
  deleteFolder,
  getFolderByFolderId,
  updateFolder,
} from "~/models/folder";
import { v4 as uuidv4 } from "uuid";

export async function action({ request }: ActionFunctionArgs) {
  const method = request.method.toUpperCase();
  const formData = await request.formData();
  switch (method) {
    case "GET": {
      const id = formData.get("id");
      if (typeof id !== "string") {
        return json({ error: "Invalid folder ID" }, { status: 400 });
      }
      const folder = await getFolderByFolderId(id);
      if (folder) return json({ folder });
      else json({ error: "Folder is not found" }, { status: 400 });
    }
    case "POST": {
      const name = formData.get("name");
      const emoji = formData.get("emoji");

      if (typeof name !== "string" || name.length === 0) {
        return json({ error: "Folder name is required" }, { status: 400 });
      }

      const folder: Folder = {
        id: uuidv4(),
        name,
        icon: typeof emoji === "string" ? emoji : "📁",
        taskCount: 0,
      };

      try {
        const newFolder = await createFolder(folder);
        return json({ newFolder });
      } catch (error) {
        console.error("Error creating folder:", error);
        return json({ error: "Failed to create folder" }, { status: 500 });
      }
    }

    case "DELETE": {
      const id = formData.get("id") as string;

      if (!id) {
        return json({ error: "Folder ID is required" }, { status: 400 });
      }

      try {
        const success = await deleteFolder(id);
        return success
          ? json({ success: true })
          : json({ success: false }, { status: 400 });
      } catch (error) {
        console.error("Error deleting folder:", error);
        return json({ error: "Failed to delete folder" }, { status: 500 });
      }
    }

    case "PUT": {
      const folder = Object.fromEntries(
        await request.formData()
      ) as unknown as Folder;

      try {
        const result = await updateFolder(folder);
        if (result === false) return json({ success: false });
        return json({ success: true });
      } catch (error) {
        console.error("Error updating folder:", error);
        return json({ error: "Failed to update folder" }, { status: 500 });
      }
    }

    default:
      return json({ error: "Method not allowed" }, { status: 405 });
  }
}
