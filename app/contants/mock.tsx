import { Folder, Task } from "./types";

export let mockFolders: Folder[] = [
  { id: "all", name: "All", icon: "📋", isDefault: true },
  { id: "default", name: "Default", icon: "📁", isDefault: true },
  { id: "work", name: "Work", icon: "💼" },
  { id: "music", name: "Music", icon: "🎧" },
  { id: "travel", name: "Travel", icon: "✈️" },
  { id: "study", name: "Study", icon: "📚" },
  { id: "home", name: "Home", icon: "🏠" },
];

export let mockTasks: Task[] = [
  {
    id: "1",
    title: "Call Max",
    folderId: "work",
    status: "todo",
    createdAt: new Date("2024-04-29T19:14:00").toISOString(),
    updatedAt: new Date("2024-04-29T19:14:00").toISOString(),
    time: new Date("2024-04-29T20:15:00").toISOString(),
    note: "Call Max about the project",
  },
  {
    id: "2",
    title: "Practice piano",
    folderId: "music",
    status: "inprogress",
    createdAt: new Date("2024-04-29T21:15:00").toISOString(),
    updatedAt: new Date("2024-04-29T21:15:00").toISOString(),
    time: new Date("2024-04-29T22:15:00").toISOString(),
    note: "Practice for the upcoming recital",
  },
  {
    id: "3",
    title: "Learn Spanish",
    folderId: "study",
    status: "pending",
    createdAt: new Date("2024-04-29T22:35:00").toISOString(),
    updatedAt: new Date("2024-04-29T22:35:00").toISOString(),
    time: new Date("2024-04-29T23:15:00").toISOString(),
    note: "Complete the next lesson",
  },
];

export const statusOptions = [
  { value: "todo", label: "Todo", color: "red" },
  { value: "inprogress", label: "In Progress", color: "yellow" },
  { value: "pending", label: "Pending", color: "blue" },
  { value: "done", label: "Done", color: "green" },
];
